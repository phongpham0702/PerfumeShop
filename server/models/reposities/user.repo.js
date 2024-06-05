const userModel = require("../users")
const converterHelper = require("../../helpers/converter.helper")

const findUserById = async (userId, select = {
    '_id':1,'Email': 1, "FullName":1
}) => {
    return await userModel.findOne({
        '_id': converterHelper.toObjectIdMongo(userId)
    },select).lean()
}

const findUserByEmail = async (Email, select = {
    '_id':1,'Email': 1, 'FullName':1,'Password': 1
}) => {
    return await userModel.findOne({'Email': Email},select).lean()
}

module.exports = {
    findUserByEmail,
    findUserById
}