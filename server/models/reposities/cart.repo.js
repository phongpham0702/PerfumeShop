const converterHelper = require('../../helpers/converter.helper')
const cartModel = require('../cart.model')
const CartModel = require('../cart.model')

const findCartById = async ({userId = null , cartId = null}) => {

    const queryFilter = userId? 
    {"userID": converterHelper.toObjectIdMongo(userId)}:
    {"_id": converterHelper.toObjectIdMongo(cartId)}
    
    let userCart = await CartModel.findOne(queryFilter,
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
        "cartProduct": {
            "$elemMatch": {
            "productId": productId,
            "modelId": modelId
        }
         }
    },
    {
        "cartProduct.$": 1
    }).lean()

}

const getMiniCartById = async({userId = null , cartId = null}) => {

    const queryFilter = userId? 
    {"userID": converterHelper.toObjectIdMongo(userId)}:
    {"_id": converterHelper.toObjectIdMongo(cartId)}
    
    let userCart = await CartModel.findOne(queryFilter,
    {
        userID:1, 
        cartProduct:1,
        cartCountProduct:1
    })
    .populate(
    {
        path:'cartProduct.productId',
        select:["productName","priceScale","productThumbnail"]  
    })
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
            productCapacity: itemModel.capacity,
            unitPrice: itemModel.price,
            inStock: itemModel.inStock,
            quantity: i.quantity,
            productName: i.productId.productName,
            modelCapacity: itemModel.capacity,
            productThumbnail: i.productId.productThumbnail
        }
    })

    return {
        cartOwner: userCart.userID,
        cartId: userCart._id,
        cartCountProduct: userCart.cartCountProduct,
        cartData
    }

}

const getCartCount = async(userId) => {
    
    let userCartCount = await CartModel.findOne({
        "userID": converterHelper.toObjectIdMongo(userId)
    },
    {
        cartCountProduct:1
    })
    .lean()

    if(!userCartCount){
        return 0
    }

    return  userCartCount.cartCountProduct
}


module.exports = {
    findCartById,
    checkProductInCart,
    getMiniCartById,
    getCartCount
}