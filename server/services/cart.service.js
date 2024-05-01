const CartModel = require('../models/cart.model')
const {BadRequestError, NotFoundError} = require('../helpers/error.response')
const { getProductInfomation, checkProductCapacity } = require('../models/reposities/product.repo')

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
        let query = {'userID': userId}
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

    /*
        product = {
            productId,
            capacityId,
            quantity,

        }
    */

    static addToCart = async(userId, product = {}) => {

        let userCart = await CartModel.findOne({'userID':userId})
        // user cart not exist
        if(!userCart)
        {
            //create user cart
            return await CartService.createUserCart(userId, product)
        }

        // user cart exist but no product inside
        if(!userCart.cartProduct.length)
        {
            userCart.cartProduct = [product]
            return await userCart.save()
        }

        return await CartService.updateUserCartQuantity(userId,product)

    }
    static addToCartV2 = async(userId, product = {}) => {
            let {productId, quantity, old_quantity} = product

            let findProduct = await getProductInfomation(productId)

            if(!findProduct) throw new NotFoundError('This product is unavailable')

            if(quantity === 0 )
            {
                //delete
            }
            return await CartService.updateUserCartQuantity(userId, {
                productId,
                quantity: quantity - old_quantity
            })
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