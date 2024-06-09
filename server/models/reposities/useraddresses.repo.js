const userAddressModel = require("../useraddress.model")
const converterHelper = require("../../helpers/converter.helper")

const deleteAddressById = async(addressID) => {

    return userAddressModel.deleteOne({
        _id: converterHelper.toObjectIdMongo(addressID)
    })

}

const updateAddress = async(addressID, updateSet = {}, options ={ new: true}) => {

    let updatedAddress = await userAddressModel.findOneAndUpdate({
        _id: converterHelper.toObjectIdMongo(addressID)
    },
    {
        $set: updateSet
    },
        options
    )
    .select(["receiverName","receiverPhoneNumber","Nation","City","District","Ward","addressDetail"])
    .lean()
    return updatedAddress
}


module.exports = {
    deleteAddressById,
    updateAddress
}