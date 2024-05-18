const converterHelper = require('../../helpers/converter.helper')
const CartModel = require('../cart.model')

const findCartById = async (cartId) => {
    return await CartModel.findOne({
        '_id': converterHelper.toObjectIdMongo(cartId)
    }).lean()
}


module.exports = {
    findCartById
}