const userModel = require("../models/users")
const UserService = require('./user.service')
const crypto = require('crypto')
const KeyTokenService = require('./keyToken.service')
const {createTokenPair} = require('../utils/token.util')
const {LoginFail, AuthFailureError} = require('../helpers/error.response')
const bcrypt = require('bcrypt');
;
class AuthService{

    static login = async (email,password)=> {

        /*
            1 - check email
            2 - check password
            3 - create AT and RT
            4 - generate token
            5 - return result
        */

        //1)
        let userInfo = await UserService.findByEmail(email)
        
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
        //create public key (AT) and private key (RT)
        let publicKey = crypto.randomBytes(64).toString('hex') 
        let privateKey = crypto.randomBytes(64).toString('hex') 

        //4)
        let token = await createTokenPair({
            userId: userInfo._id,
            Email : userInfo.Email,
            Password: userInfo.Password,
            isVerify: userInfo.isVerify,
            isAdmin: userInfo.isAdmin
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
                name: userInfo.FullName
            },
            token: token.accessToken
        }
    }

    static logout = async(keyStore)=> {

        let delKey = await KeyTokenService.removeUserKey(keyStore._id)

        return delKey

    }
}

module.exports = AuthService