const converterHelper = require("../../helpers/converter.helper")
const keytokenModel = require("../keytoken.model")

const findUserKeyById = async (userId) => {

    return await keytokenModel.findOne({'userId': converterHelper.toObjectIdMongo(userId)},{
        createdAt: 0 , updatedAt: 0, expireAt: 0 , __v:0
    })

}

const findKeyById = async(id) => {
    return await keytokenModel.findOne({"_id": converterHelper.toObjectIdMongo(id)},{
        createdAt: 0, updatedAt: 0, expireAt: 0 , __v:0
    })
}

const deleteKeyById = async (id) => {
    return await keytokenModel.deleteOne({"_id": converterHelper.toObjectIdMongo(id)})
}

module.exports = {
    findUserKeyById,
    findKeyById,
    deleteKeyById
}