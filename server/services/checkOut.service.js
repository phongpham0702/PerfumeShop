const { findCartById } = require("../models/reposities/cart.repo")
const { BadRequestError } = require('../helpers/error.response');
const CartService = require("./cart.service");
const voucherModel = require("../models/voucher.model");
const { findUserById } = require("../models/reposities/user.repo");
const cartModel = require("../models/cart.model");

class CheckoutService {

    /* 
        payload:{
            userId,
            cartId,
            voucherId: []
        }
    */


    static async Review(userId){
        const foundCart = await findCartById({userId})
        let totalPrice = 0

        if(!foundCart)
        {
            throw new BadRequestError('Cannot find your cart')
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
            cartId: foundCart.cartId.toString(),
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

    static async UserPurchase(userInfo, cart, additionInfo ={receiverInfo ,voucherCode, orderPayment})
    {
        const orderPayment = additionInfo.orderPayment
        let cartData = cart
        console.log(cart);

    }

}


module.exports = CheckoutService