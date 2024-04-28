const CartModel = require('../models/cart.model')
const {BadRequestError} = require('../helpers/error.response')
const { getProductById } = require('../models/reposities/product.repo')

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

    static createUserCart = async(userId , product) => {
        let query = {'userID': userId, 'cartState': 'active'}
        let updateOrInsert = {
            '$addToSet':{
                'cartProduct': product
            }
        }
        let options = {
            'upsert':true,
            'new': true
        }
        return CartModel.findOneAndUpdate(query,updateOrInsert,options)
    }

    static updateUserCartQuantity = async(userId,product) =>{
        let {productId, quantity} = product
        let query = {
            'userID': userId,
            'cartProduct.productId': productId,
            'cartState': 'active'
        }
        let updateSet = {
            '$inc':{
                'cartProduct.$.quantity': quantity
            }
        }
        let options = {
            'upsert':true,
            'new': true
        }
        return CartModel.findOneAndUpdate(query,updateSet,options)
    }

    static addToCart = async(userId, product = {}) => {

        let userCart = await CartModel.findOne({'userID':userId})
        if(!userCart)
        {
            //create user cart
            return await CartService.createUserCart(userId, product)
        }

        if(!userCart.cartProduct.length)
        {
            userCart.cartProduct = [product]
            userCart.cartCountProduct = userCart.cartProduct.length
            return await userCart.save()
        }

        return await CartService.updateUserCartQuantity(userId,product)

    }

    static addToCartV2 = async(userId, product) => {
        let {productId, quantity} = product

        let findProduct = await getProductById(productId)
    }
}

module.exports = CartService