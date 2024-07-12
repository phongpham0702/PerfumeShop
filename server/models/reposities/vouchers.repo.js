const converterHelper = require("../../helpers/converter.helper")
const voucherModel = require("../voucher.model")

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

const getUserCheckOutInfo = async(userId, select = {
    '_id':1,'Email': 1, "FullName":1, "PhoneNumber":1, "Addresses":1, "defaultAddress":1
}) => {

    return await userModel.findOne({
        '_id': converterHelper.toObjectIdMongo(userId)
    },select)
    .populate({
     path:"Addresses",
     select:"receiverName receiverPhoneNumber Nation City District Ward addressDetail"
    })
    .lean()
    .exec()
}

module.exports = {
    findUserByEmail,
    findUserById,
    getUserCheckOutInfo
}