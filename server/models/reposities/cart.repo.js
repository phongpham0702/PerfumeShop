const converterHelper = require('../../helpers/converter.helper')
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


module.exports = {
    findCartById
}