const keyTokenModel = require('../models/keytoken.model')
const {ServerError, AuthFailureError} = require('../helpers/error.response') 
const {Types} = require('mongoose')
const JWT = require('jsonwebtoken')

class KeyTokenService{
 
    static createKeyToken = async({userId, refreshToken,publicKey,privateKey}) => {

        try 
        {

            let filter = {
                userId: userId
            }

            let update = {
                publicKey,
                privateKey,
                refreshTokenUsed: [],
                refreshToken
            }

            let options = {
                upsert: true,
                new: true
            }
            let token = await keyTokenModel.findOneAndUpdate(filter,update,options)

            return token ? token.publicKey : null

        } 
        catch (error) {
            throw new ServerError(error)
        }

    }

    static deleteUserKeyById = async (userId) => {
        return await keyTokenModel.deleteOne({"userId": new Types.ObjectId(userId)})
    }

}

module.exports = KeyTokenService