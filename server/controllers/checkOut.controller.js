const responseHelper = require("../helpers/success.response");
const {validationResult} = require('express-validator')
const { findCartById, getMiniCartById } = require("../models/reposities/cart.repo");
const CheckoutService = require("../services/checkOut.service");
const { findUserById } = require("../models/reposities/user.repo");
const { BadRequestError, ServerError } = require("../helpers/error.response");
const stripeAPI = require('stripe');
const CartService = require("../services/cart.service");
const converterHelper = require("../helpers/converter.helper");
let stripeGateway = stripeAPI(process.env.STRIPE_SECRET_KEY);

const createStripeSession = async (options) => {
    try {
        const { items, success_url, cancel_url } = options;

        const lineItems = items.map((item) => {
            const unitAmount = Math.round(item.price * 100);
            return {
                price_data: {
                    currency: 'usd',
                    
                    product_data: {
                        name: item.name,
                        images: [item.image || 'https://react.semantic-ui.com/images/wireframe/square-image.png'],
                    },
                    unit_amount: unitAmount,
                },
                quantity: item.quantity,
            };
        });

        // console.log(lineItems);

        const session = await stripeGateway.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: success_url,
            cancel_url: cancel_url,
            line_items:lineItems,
            //  Asking address in Stripe
            billing_address_collection: 'required',
        });

        // console.log('Stripe Payment Created');

        return session.url;
    } catch (error) {
        console.log(error);
        return undefined;
    }
};



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

            if(checkOutOrder) await CartService.deleteAllItems(userInfo._id);
        }

        if(checkOutOrder)
        {   
            let {ownerType,
                createdAt, 
                updatedAt, 
                orderStatus, 
                __v, 
                _id, 
                orderProducts ,
                ...metaDataBody } = checkOutOrder
            new responseHelper.CREATED({
                metadata:{
                    orderId: _id,
                    orderProducts: userCart.cartData.map(({inStock, ...rest} )=> rest),
                    ...metaDataBody,
                   
                }
            }).send(res)
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