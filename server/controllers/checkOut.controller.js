const responseHelper = require("../helpers/success.response");
const {validationResult} = require('express-validator')
const { findCartById, getMiniCartById } = require("../models/reposities/cart.repo");
const CheckoutService = require("../services/checkOut.service");
const { findUserById } = require("../models/reposities/user.repo");
const { BadRequestError, ServerError } = require("../helpers/error.response");
const { createStripeSession } = require("../utils/payment.utils");

const SUPPORTED_PAYMENT_METHOD = {"COD":"cod-payment","Online":"online-payment"}

class CheckoutController{

    reviewOrder = async(req,res,next) => {

        if(!req.userid)
        {
            new responseHelper.OK({
                metadata: "Not available"
            }).send(res)
        }   

        new responseHelper.OK({
            metadata: await CheckoutService.Review(req.userid)
        }).send(res)
    }

    checkOut = async(req,res,next) => {

        let checkResult = await validationResult(req);
        
        if(checkResult.errors.length >= 1) throw new BadRequestError(checkResult.errors[0].msg)
    
        //1) Check user info
        //2)Check user cart
        const {receiverName, receiverEmail, receiverPhone, receiverAddress, cartId,voucherCode, orderPayment} = req.body

        const receiverInfo = {
            receiverName,
            receiverEmail, 
            receiverPhone, 
            receiverAddress
        }
        let userCart = null;
        let checkOutOrder = null;

        if(!req.userid)
        {
            new responseHelper.OK({
                metadata: "Not available"
            }).send(res)   
        }
        else
        {
            const userInfo = await findUserById(req.userid,{
                _id:1,
                Email: 1
            })
            if(!userInfo) throw new BadRequestError("Cannot find user information")
            
            userCart = await getMiniCartById({cartId})
            
            if(!userCart) throw new BadRequestError("Cannot find user cart")
            
            if(userCart.cartOwner.toString() != userInfo._id.toString()) throw new BadRequestError("This is not your cart")
            if(userCart.cartData.length <= 0 ) throw new BadRequestError("Your cart is empty")

            checkOutOrder = await CheckoutService.CheckOut(userInfo, userCart, orderPayment ,{receiverInfo, voucherCode});
            
            //if(checkOutOrder) await CartService.deleteAllItems(userInfo._id);
        }

        if(checkOutOrder)
        {   
            let {ownerType,
                updatedAt, 
                orderStatus, 
                __v, 
                _id, 
                orderProducts ,
                ...metaDataBody } = checkOutOrder

            switch (orderPayment) {
                case SUPPORTED_PAYMENT_METHOD.COD:
                    new responseHelper.CREATED({
                        metadata:{
                            orderId: _id,
                            orderProducts: userCart.cartData.map(({inStock, ...rest} )=> rest),
                            ...metaDataBody,
                        }
                    }).send(res)
                    break;
                case SUPPORTED_PAYMENT_METHOD.Online:
                    
                    const voucher = {
                        name : checkOutOrder.applyVoucherTitle,
                        discount_value: checkOutOrder.discount
                    }
                    
                    const stripeSession = await createStripeSession(checkOutOrder._id,userCart.cartData, voucher);
                    
                    new responseHelper.REDIRECT({
                        metadata:{
                           paymentURL: stripeSession
                        }
                    }).send(res)
                    break;
                default:
                    new responseHelper.CREATED({
                        metadata:{
                            orderId: _id,
                            orderProducts: userCart.cartData.map(({inStock, ...rest} )=> rest),
                            ...metaDataBody,
                        }
                    }).send(res)
                    break;
            }

            
            
        }
        else
        {
            throw new ServerError("Creating order error");
        }
    }

    test_payment = async()=>{

        async function testStripe() {
            //const rate = await exchangeRate('vnd', 'usd');
            let result = await createStripeSession({
                items: [
                    {
                        name: 'Ganymede',
                        price: 215,
                        quantity: 2,
                        image: 'https://storage.googleapis.com/luxeperfume/images/product_images/marc-antoine-barrois/ganymede/photo_1.png',
                    },
                    {
                        name: 'Ganymede',
                        price: 215,
                        quantity: 2,
                        image: 'https://storage.googleapis.com/luxeperfume/images/product_images/marc-antoine-barrois/ganymede/photo_1.png',
                    },
                ],
                success_url: 'http://localhost:3000/success',
                cancel_url: 'http://localhost:3000/fail',
            });
        
            console.log(result);
        }
        await testStripe();

        return "Test stripe"
    }
}


module.exports = new CheckoutController