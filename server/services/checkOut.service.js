const { findCartById } = require("../models/reposities/cart.repo")
const { BadRequestError } = require('../helpers/error.response');
const CartService = require("./cart.service");
const voucherModel = require("../models/voucher.model");
const { findUserById } = require("../models/reposities/user.repo");

class CheckoutService {

    /* 
        payload:{
            userId,
            cartId,
            voucherId: []
        }
    */


    static async Review(userId, cartId){
        const foundCart = await CartService.getCart(userId)
        let totalPrice = 0

        if(!foundCart)
        {
            throw new BadRequestError('Cannot find your cart')
        }

        if(cartId != foundCart.cartId.toString())
        {
            throw new BadRequestError('No cart was found')
        }
        const foundUser = await findUserById(userId,{
                    _id:1,
                    Email:1,
                    FullName:1,
                    PhoneNumber:1
        })

        if(!foundUser)
        {
            throw new BadRequestError('Cannot find your information')
        }

        for(let i of foundCart.cartData)
        {
            totalPrice += i.unitPrice * i.quantity
        }
        
        const order = {
            cartId,
            cartCountProduct: foundCart.cartCountProduct,
            userInfo:{
                userId: foundUser._id,
                fullName: foundUser.FullName,
                email: foundUser.Email,
                phoneNumber: foundUser.PhoneNumber,
                addressList: []
            },
            cartData: foundCart.cartData,
            totalPrice,
        }

        return order
    }

}


module.exports = CheckoutService