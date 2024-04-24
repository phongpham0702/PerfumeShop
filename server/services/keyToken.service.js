const keyTokenModel = require('../models/keytoken.model')

const {ServerError} = require('../helpers/error.response') 
const {Types} = require('mongoose')
class KeyTokenService{
 
    static createKeyToken = async({userId, publicKey, privateKey, refreshToken}) => {

        try 
        {

            let filter = {
                User: userId
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

    static findUserKeyById = async (userID)=>{

        return await keyTokenModel.findOne({'User':new Types.ObjectId(userID)}).lean()

    }

    static removeUserKey = async (keyId)=>{
        
        return await keyTokenModel.deleteOne({'_id': new Types.ObjectId(keyId)})

    }   

    static findRefreshTokenUsed = async(refreshToken)=>{
        return await keyTokenModel.findOne({'refreshTokenUsed': refreshToken}).lean()
    }

    static findRefreshToken = async(refreshToken)=>{
        return await keyTokenModel.findOne({'refreshToken': refreshToken})
    }

    static deleteKeyById = async (userId) => {
        return await keyTokenModel.deleteOne({"User": new Types.ObjectId(userId)})
    }
}

module.exports = KeyTokenService