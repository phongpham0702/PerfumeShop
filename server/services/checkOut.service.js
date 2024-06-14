const { findCartById } = require("../models/reposities/cart.repo")
const { BadRequestError } = require('../helpers/error.response');
const CartService = require("./cart.service");
const { findUserById } = require("../models/reposities/user.repo");
const VoucherService = require("./voucher.service");
const OrderService = require("./orders.service");

const PAYMENT_METHOD = ["cod-payment","online-payment"]

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

    static async CheckOut(userInfo, 
        userCart, 
        paymentMethod,
        additionInfo ={receiverInfo ,voucherCode})
    {   

        //check payment method
        if(!PAYMENT_METHOD.includes(paymentMethod)) throw new BadRequestError("Payment method is not supported")

        //calculate cart total 
        let cartTotal = 0
        for(let item of userCart.cartData)
        {
            cartTotal += item.quantity * item.unitPrice
        }

        //check voucher
        let checkVoucherResult = null
        if(additionInfo.voucherCode !== "" && additionInfo.voucherCode !== null){
            checkVoucherResult = await VoucherService.checkVoucher(userInfo._id.toString(), cartTotal, additionInfo.voucherCode);
        }

        if(checkVoucherResult && !checkVoucherResult.checkResult.isValid){
            throw new BadRequestError(checkVoucherResult.checkResult.checkMessage);
        }    
        
        OrderService.CreateOrder({
            ownerId: userInfo._id,
            receiverData: additionInfo.receiverInfo,
            userCartData: userCart,
            voucherData: checkVoucherResult,
            orderTotal: cartTotal
        })


    }

}


module.exports = CheckoutService