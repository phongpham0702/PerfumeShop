const { findCartById } = require("../models/reposities/cart.repo")
const { BadRequestError, ServerError } = require('../helpers/error.response');
const { getUserCheckOutInfo } = require("../models/reposities/user.repo");
const VoucherService = require("./voucher.service");
const OrderService = require("./orders.service");
const databaseInstance = require("../dbs/init.db");


class CheckoutService {

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

        //calculate cart total & check in-stock quantity
        let cartTotal = 0
        for(let item of userCart.cartData)
        {
            if(item.quantity > item.inStock)
            {
                throw new BadRequestError(`Product ${item.productName} ${item.productCapacity} only have ${item.inStock} left in stock.`)
            } 
            cartTotal += item.quantity * item.unitPrice
        }

        //check voucher
        let checkVoucherResult = null
        if(additionInfo.voucherCode !== "" && additionInfo.voucherCode){
            checkVoucherResult = await VoucherService.checkVoucher(userInfo._id.toString(), cartTotal, additionInfo.voucherCode, true);
        }
        
        if(checkVoucherResult && !checkVoucherResult.checkResult.isValid){
            throw new BadRequestError(checkVoucherResult.checkResult.checkMessage);
        }   

        //create order
        const transactionSession = await databaseInstance.getMongoClient().startSession();

        try 
        {

            transactionSession.startTransaction();
           
            //Create order
            const order = await OrderService.CreateOrder({
                ownerId: userInfo._id,
                receiverData: additionInfo.receiverInfo,
                userCartData: userCart,
                voucherData: checkVoucherResult,
                subTotal: cartTotal,
                payment: paymentMethod
            }, transactionSession)  
            await transactionSession.commitTransaction();
            console.log(`Order ${order[0]._id.toString()} created successfully`);

            return order[0].toObject();
        } 
        catch (error) {
            await transactionSession.abortTransaction();
            console.error('Error creating order:', error.message);

            return null;
        }
        finally{
            transactionSession.endSession();
        }

    }

}


module.exports = CheckoutService