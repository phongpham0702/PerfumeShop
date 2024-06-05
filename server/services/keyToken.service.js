const keyTokenModel = require('../models/keytoken.model')
const {ServerError, AuthFailureError} = require('../helpers/error.response') 
const JWT = require('jsonwebtoken')
const { deleteKeyById } = require('../models/reposities/keystore.repo')

class KeyTokenService{
 
    static createKeyToken = async({userId, refreshToken,accessToken,publicKey,privateKey}) => {
        let futureExpire = Date.now() + parseInt(process.env.REFRESH_TOKEN_TIME) + 86400000;

        let expireAt = new Date(futureExpire)

        try {
            let tokenStore = await keyTokenModel.create({
                userId,
                publicKey,
                privateKey,
                refreshToken,
                activeAccessToken: accessToken,
                expireAt
            })
            
            return tokenStore ? tokenStore:null
        } 
        catch (error) {
            throw new ServerError(error)
        }

    }
}

module.exports = KeyTokenService