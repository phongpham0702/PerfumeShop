const CartModel = require('../models/cart.model')
const ProductModel = require('../models/product')
const {BadRequestError, NotFoundError} = require('../helpers/error.response')
const { getProductInfomation, checkProductCapacity } = require('../models/reposities/product.repo')
const converterHelper = require('../helpers/converter.helper')

/*
    Key features:
    - add product to user cart
    - reduce product quantity by one
    - increase product quantity by one
    - get user cart
    - delete all item in cart
    - delete each item in cart
*/

class CartService{

    static createUserCart = async(userId , product = {}) => {
        let query = {'userID': userId}
        let {productId, modelId} = product.productData
        let quantity = product.quantity
        let updateOrInsert = {
            '$addToSet':{
                'cartProduct': {
                    productId: converterHelper.toObjectIdMongo(productId),
                    modelId: converterHelper.toObjectIdMongo(modelId),
                    quantity
                }
            },
            '$inc':{
                'cartCountProduct': quantity
            }
        }
        let options = {
            'upsert':true,
            'new': true,
            'select': 'userID cartCountProduct cartProduct'
        }
        return CartModel.findOneAndUpdate(query,updateOrInsert,options)
    }

    static getCart = async(userId) => {
        let userCart = await CartModel.findOne({'userID': userId},
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

        if(!userCart){
            return {cartData:[]}
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

        return {userID: userCart.userID,
            cartCountProduct: userCart.cartCountProduct,
            cartData
        }
    }

    static addToCart = async(userId, product = {}) => {

        let userCart = await CartModel.findOne({'userID':userId},{
            _id: 1, userID:1,cartCountProduct:1, cartProduct:1
        })
        
        // user cart not exist
        if(!userCart)
        {
            //create user cart
            return await CartService.createUserCart(userId, product)
        }

        let {productId, modelId} = product.productData
        let quantity = product.quantity

        let isContainsProduct = userCart.cartProduct.some((p) => {
            if(p.productId.toString() === productId && p.modelId.toString() === modelId)
            {
                return true
            }    
            return false
        })

        if(isContainsProduct)
        {
            return await CartService.updateUserCartQuantity(userId,productId, modelId, quantity)
        }
        else
        {
            userCart.cartProduct.push({
                productId: converterHelper.toObjectIdMongo(productId),
                modelId: converterHelper.toObjectIdMongo(modelId),
                quantity
            })
            userCart.cartCountProduct += quantity
            return await userCart.save()
        }
        
    }

    static updateUserCartQuantity = async(userId, productId, modelId, quantity) =>{
        let query = {     
            'userID': userId,
            'cartProduct.productId': converterHelper.toObjectIdMongo(productId),
            'cartProduct.modelId': converterHelper.toObjectIdMongo(modelId)      
        }
        let updateSet = {
            '$inc':{
                'cartProduct.$.quantity': quantity,
                'cartCountProduct': quantity
            }
        }
        let options = {
            upsert:true,
            new: true,
            select: 'userID cartCountProduct cartProduct'
        }
        return CartModel.findOneAndUpdate(query,updateSet,options)
    }

    

    

    static deleteUserCart = async (userId, productId) => {
        let query = {
            'userID': userId,
            'cartState': 'active'
        }
        let updateSet = {
            '$pull':{
                'cartProduct': productId
            }
        }
        
        let deleteItem = await CartModel.updateOne(query,updateSet)
        return deleteItem
    }

}

module.exports = CartService