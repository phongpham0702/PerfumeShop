const {validationResult} = require('express-validator');
const { BadRequestError, ServerError } = require('../helpers/error.response');
const responseHelper = require("../helpers/success.response");
const GuestService = require('../services/guest.service');
const {encrypt} = require("../utils/encrypt.util");
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

            res.cookie("cart-hash",newCartHash,{
                httpOnly:true,
                secure: true,
                sameSite:"none",
                signed:true
            })
            console.log(newCartHash);
            new responseHelper.SuccessResponse({
                metadata:{
                    "cartCountProduct": userCart.cartProductCount,
                    "addedItem": {
                        "productId": productData.productId,
                        "modelId": product,
                        "quantity": 2
                    }
                }
            }).send(res);

        }
    }

}

module.exports = new GuestController();