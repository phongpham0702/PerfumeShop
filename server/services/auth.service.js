const UserService = require('./user.service')
const KeyTokenService = require('./keyToken.service')
const {createTokenPair} = require('../utils/token.util')
const {LoginFail, AuthFailureError, ForbiddenError} = require('../helpers/error.response')
const bcrypt = require('bcrypt');
const crypto = require('crypto')
const { findUserByEmail,findUserById } = require("../models/reposities/user.repo");
const { removeUIDCookie, removeRTCookie } = require('../helpers/cookieHelpers/removeCookie.helper');

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
        let token = await createTokenPair({
            userId: userInfo._id,
            Email : userInfo.Email,
        },publicKey,privateKey)

        await KeyTokenService.createKeyToken({
            userId: userInfo._id,
            refreshToken: token.refreshToken,
            publicKey,
            privateKey
        })

        return {
            userInfo:{
                userId: userInfo._id,
                email: userInfo.Email,
                name: userInfo.FullName,
            },
            accessToken: token.accessToken,
            refreshToken: token.refreshToken
        }
    }

    static logout = async(userId,res)=> {

        let delKey = await KeyTokenService.deleteUserKeyById(userId)
        removeRTCookie(res)
        removeUIDCookie(res)
        return delKey

    }

    static handlerRefreshToken = async ({refreshToken, userId, keyStore}) =>{

        if(keyStore.refreshTokenUsed.includes(refreshToken))
        {
            await KeyTokenService.deleteUserKeyById(userId) 
            throw new AuthFailureError('We suspect your account is being impersonated. Please log in again.')
        }

        if(keyStore.refreshToken !== refreshToken) throw new AuthFailureError('Please login again !')
        
        let userInfo = await findUserById(userId)

        if(!userInfo) throw new AuthFailureError('Cannot find user')

        let newToken = await createTokenPair({
            userId: userInfo._id,
            Email : userInfo.Email,
        },keyStore.publicKey, keyStore.privateKey)

        await keyStore.updateOne({
             $set:{
                 'refreshToken': newToken.refreshToken
             },
             $addToSet:{
                 'refreshTokenUsed': refreshToken
             }
         })

         return {
            userInfo:{
                userId: userInfo._id,
                email: userInfo.Email,
                name: userInfo.FullName,
            },
            accessToken: newToken.accessToken,
            refreshToken: newToken.refreshToken
        }

     }
}

module.exports = AuthService