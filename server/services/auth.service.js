const KeyTokenService = require('./keyToken.service')
const {createAccessToken, createRefreshToken} = require('../utils/token.util')
const {AuthFailureError, ServerError} = require('../helpers/error.response')
const bcrypt = require('bcrypt');
const crypto = require('crypto')
const { findUserByEmail,findUserById } = require("../models/reposities/user.repo");
const { removeTokenIDCookie} = require('../helpers/cookieHelpers/removeCookie.helper');
const { deleteKeyById } = require('../models/reposities/keystore.repo');

class AuthService{

    static login = async (email,password)=> {

        /*
            1 - check email
            2 - check password
            3 - create AT and RT
            4 - return result
        */
        
        //1)
        let userInfo = await findUserByEmail(email)
        
        if(!userInfo )
        {
            throw new AuthFailureError("Email or Password is not correct.")
        }
        
        //2)
        let checkPassword = await bcrypt.compare(password, userInfo.Password)

        if(!checkPassword)
        {
            throw new AuthFailureError("Email or Password is not correct.")
        }

        //3)
        let publicKey = crypto.randomBytes(64).toString('hex') 
        let privateKey = crypto.randomBytes(64).toString('hex') 

        //4)
        let tokenData = {
            userId: userInfo._id,
        }

        let accessToken = await createAccessToken(tokenData,publicKey)
        let refreshToken = await createRefreshToken({
            ...tokenData,
            userPass: userInfo.Password
        },privateKey)

        let keyStore = await KeyTokenService.createKeyToken({
            userId: userInfo._id,
            refreshToken: refreshToken,
            accessToken: accessToken,
            publicKey,
            privateKey
        })
        
        if(keyStore === null)
        {
            throw new ServerError()
        }

        return {
            userInfo:{
                userId: userInfo._id.toString(),
                email: userInfo.Email,
                name: userInfo.FullName,
            },
            keyId: keyStore._id.toString(),
            accessToken,
            refreshToken
        }
    }

    static logout = async(tokenId,res)=> {

        let delKey = await deleteKeyById(tokenId)

        removeTokenIDCookie(res)

        return delKey

    }

    static handlerRefreshToken = async ({refreshData, keyStore}) =>{
     
        let userInfo = await findUserById(refreshData.userId)

        if(!userInfo) throw new AuthFailureError('Cannot find user')
        let tokenData = {
            
            userId: refreshData.userId,
            
        }
        let newToken = await createAccessToken(tokenData, keyStore.publicKey)

        await keyStore.updateOne({
             $set:{
                 'activeAccessToken': newToken
             }
         })

         return {
            userInfo:{
                userId: userInfo._id,
                email: userInfo.Email,
                name: userInfo.FullName,
            },
            accessToken: newToken,
        }

     }
}

module.exports = AuthService