const CartService = require("../services/cart.service");
const CartModel = require('../models/cart.model')
const responseHelper = require("../helpers/success.response");
const {validationResult} = require('express-validator');
const { BadRequestError, ServerError } = require("../helpers/error.response");

class CartController {

    getUserCart = async(req,res,next) => {

        new responseHelper.SuccessResponse({
            metadata: await CartService.getCart(req.userid)
        }).send(res)
    }

    addToCart = async(req,res,next) => {

        let checkResult = await validationResult(req);

        if(checkResult.errors.length > 0)
        {

            throw new BadRequestError('Adding product to cart failed.')
        }
        else
        {
            let {productData, quantity} = req.body
            let result = await CartService.addToCart(req.userid, {productData,quantity})

            if(!result) throw new ServerError()

            new responseHelper.SuccessResponse({
                metadata: {
                    userID: result.userID,
                    cartCountProduct: result.cartCountProduct,
                    cartProduct: result.cartProduct
                }
            }).send(res)
        }
    }

    updateCart = async(req,res,next) => {
        let checkResult = await validationResult(req);

        if(checkResult.errors.length > 0)
        {

            throw new BadRequestError('Updating product failed.')
        }

        let {productId, modelId,quantity} = req.body

        let productInCart = await CartModel.findOne({
            userID: req.userid,
            'cartProduct.productId': productId,
            'cartProduct.modelId': modelId
        },{'cartProduct.$': 1})
        .lean()

        if(!productInCart)
        {
            throw new BadRequestError('Cannot find this product in cart.')
        }

        let old_quantity = productInCart.cartProduct[0].quantity

        let increaseBy = quantity - old_quantity

        new responseHelper.SuccessResponse({
            metadata: await CartService.updateUserCartQuantity(req.userid,productId,modelId,increaseBy)
        }).send(res)
    }  
    
    deleteCartItem = async(req,res,next) => {
        
    }

}


module.exports = new CartController()
