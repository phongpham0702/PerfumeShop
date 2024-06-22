const {validationResult} = require('express-validator');
const { BadRequestError, ServerError } = require('../helpers/error.response');
const responseHelper = require("../helpers/success.response");
const GuestService = require('../services/guest.service');
const {encrypt} = require("../utils/encrypt.util");

const CART_EXIST_TIME = 1;                                                                            

class GuestController {
    
    AddToCart = async(req,res,next) => {
        const checkResult = await validationResult(req);

        if(checkResult.errors.length > 0)
        {
            if(checkResult.errors[0].path === "quantity")
            {
                throw new BadRequestError(checkResult.errors[0].msg)
            }
            else{
                throw new BadRequestError("Adding product to cart failed.")
            }            
        }
        else{
            const {productData, quantity} = req.body
            const userCart= await GuestService.AddToCart(req.cartHash,productData.productId, productData.modelId, quantity);
                                                                                                                                                                                                                                                                                
            if(!userCart) throw new ServerError();
            let newCartHash = encrypt(JSON.stringify(userCart))
            console.log(userCart);
            res.cookie("cart-hash",newCartHash,{
                httpOnly:true,
                secure: true,
                sameSite:"Lax",
                signed:true
            })
            
            new responseHelper.SuccessResponse({
                metadata:{
                    "cartCountProduct": userCart.cartProductCount,
                    "addedItem": {
                        "productId": productData.productId,
                        "modelId": productData.modelId,
                        "quantity": quantity
                    }
                }
            }).send(res);

        }
    }

}

module.exports = new GuestController();