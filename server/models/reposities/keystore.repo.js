const converterHelper = require("../../helpers/converter.helper")
const keytokenModel = require("../keytoken.model")



const findUserKeyById = async (userId) => {

    return await keytokenModel.findOne({'userId': converterHelper.toObjectIdMongo(userId)},{
        createdAt: 0 , updatedAt: 0
    })

}


module.exports = {
    findUserKeyById,
}