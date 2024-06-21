const {validationResult} = require('express-validator');
const { BadRequestError, ServerError } = require('../helpers/error.response');
const responseHelper = require("../helpers/success.response");
const GuestService = require('../services/guest.service');
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
            const addResult = await GuestService.AddToCart(req.cartHash,productData.productId, productData.modelId, quantity);

            if(!addResult) throw new ServerError();

            new responseHelper.SuccessResponse({
                metadata:""
            }).send(res);

        }
    }

}

module.exports = new GuestController();