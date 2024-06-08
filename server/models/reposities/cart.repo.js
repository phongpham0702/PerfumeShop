const converterHelper = require('../../helpers/converter.helper')
const cartModel = require('../cart.model')
const CartModel = require('../cart.model')

const findCartById = async (cartId) => {
    let userCart = await CartModel.findOne({
        
        '_id': converterHelper.toObjectIdMongo(cartId)
    
    },
    {
        userID:1, 
        cartProduct:1,
        cartCountProduct:1
    })
    .populate(
    {
        path:'cartProduct.productId',
        select:['productName','productBrand','productThumbnail','priceScale']  
    })
    .exec()
    .lean()

    if(!userCart){
        return null
    }

    let cartData = userCart.cartProduct.map((i) => {
        let itemModel = i.productId.priceScale.find((m)=> {
            return m._id.toString() == i.modelId.toString()
        })
        return {

            productId: i.productId._id.toString(),
            modelId: i.modelId.toString(),
            productName: i.productId.productName,
            productBrand: i.productId.productBrand,
            productThumbnail: i.productId.productThumbnail,
            productCapacity: itemModel.capacity,
            unitPrice: itemModel.price,
            quantity: i.quantity
        }
    })

    return {
        cartId: userCart._id,
        cartCountProduct: userCart.cartCountProduct,
        cartData
    }
}

const checkProductInCart = async(userId, productId, modelId) => {

    return await CartModel.findOne({
        "userID": userId,
        "cartProduct.productId": productId,
        "cartProduct.modelId": modelId,
    },
    {
        "cartProduct.$": 1
    }).lean()

}

const getCartIdByUserId = async(userId) => {
    let userCartId = await cartModel.findOne({
        userID: converterHelper.toObjectIdMongo(userId)
    },
    {
        _id:1
    })
    .lean()

    if(!userCartId){
        return null
    }

    return userCartId

}




module.exports = {
    findCartById,
    checkProductInCart,
    getCartIdByUserId
}