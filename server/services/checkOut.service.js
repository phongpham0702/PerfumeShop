const { findCartById } = require("../models/reposities/cart.repo")
const { BadRequestError, ServerError } = require('../helpers/error.response');
const CartService = require("./cart.service");
const { findUserById, getUserCheckOutInfo } = require("../models/reposities/user.repo");
const VoucherService = require("./voucher.service");
const OrderService = require("./orders.service");
const databaseInstance = require("../dbs/init.db");
const productModel = require("../models/product");

//constant
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

        const foundUser = await getUserCheckOutInfo(userId);
        
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
                addressList: foundUser.Addresses,
                defaultAddress: foundUser.defaultAddress
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
        let cartProductIdList = [] //product in user cart
        for(let item of userCart.cartData)
        {
            console.log(item);
            if(item.quantity > item.inStock)
            {
                throw new BadRequestError(`Product ${item.productName} only have ${item.inStock} left in stock.`)
            } 
            cartTotal += item.quantity * item.unitPrice
            cartProductIdList.push(item.productId)
        }

        //check voucher
        let checkVoucherResult = null
        if(additionInfo.voucherCode !== "" && additionInfo.voucherCode !== null){
            checkVoucherResult = await VoucherService.checkVoucher(userInfo._id.toString(), cartTotal, additionInfo.voucherCode);
        }
        
        if(checkVoucherResult && !checkVoucherResult.checkResult.isValid){
            throw new BadRequestError(checkVoucherResult.checkResult.checkMessage);
        }   

        //check product quantity



        const transactionSession = await databaseInstance.getMongoClient().startSession();

        
        try 
        {

            transactionSession.startTransaction();
           
   
            // //check product quantity 
            // const productInList = await productModel.find({_id:{ $in: cartProductIdList }},
            // {
            //     productName:1,
            //     productQuantity:1,
            //     sold:1
            // },
            // {
            //     session:transactionSession
            // })
            
            // for (const key in productInList) {
            //     //console.log(key);
            // }
            

            OrderService.CreateOrder({
                ownerId: userInfo._id,
                receiverData: additionInfo.receiverInfo,
                userCartData: userCart,
                voucherData: checkVoucherResult,
                orderTotal: cartTotal
            })  
            
            await transactionSession.commitTransaction();
            console.log('Order created successfully');
        } 
        catch (error) {
            await transactionSession.abortTransaction();
            console.error('Error creating order:', error.message);
        }
        finally{
            transactionSession.endSession();
        }

    }

}


module.exports = CheckoutService