const CartService = require('../services/cart.service');
const CartModel = require('../models/cart.model');
const responseHelper = require('../helpers/success.response');
const { validationResult } = require('express-validator');
const { BadRequestError, ServerError } = require('../helpers/error.response');
const { checkProductInCart } = require('../models/reposities/cart.repo');

class CartController {
    getUserCart = async(req, res, next) => {
        new responseHelper.SuccessResponse({
            metadata: await CartService.getCart(req.userid),
        }).send(res);
    };

    addToCart = async(req, res, next) => {
        let checkResult = await validationResult(req);

        if (checkResult.errors.length > 0) {
            if(checkResult.errors[0].path === "quantity"){
                throw new BadRequestError( checkResult.errors[0].msg);
            }
            else{
                throw new BadRequestError('Adding product to cart failed.')
            }
        } else {
            let { productData, quantity } = req.body;
            let result = await CartService.addToCart(req.userid, {
                productData,
                quantity,
            });

            if (!result) throw new ServerError();

            new responseHelper.SuccessResponse({
                metadata: {
                    cartId: result._id,
                    cartCountProduct: result.cartCountProduct,
                    addedItem: {
                        productId: productData.productId,
                        modelId: productData.modelId,
                        quantity: quantity,
                    },
                },
            }).send(res);
        }
    };

    updateCart = async(req, res, next) => {
        let checkResult = await validationResult(req);
        
        if (checkResult.errors.length > 0) {
            console.log(checkResult.errors);
            throw new BadRequestError('Updating product failed.');
        }

        let { productId, modelId, new_modelId, quantity } = req.body;

        let productInCart = await checkProductInCart(req.userid,productId,modelId);
        
        if (!productInCart) {
            throw new BadRequestError('Cannot find this product in cart.');
        }

        let old_quantity = productInCart.cartProduct[0].quantity;

        let increaseBy = quantity - old_quantity;
        let updateResult;
        let updatedItem = {
            productId,
            modelId,
            "old_quantity": old_quantity,
            "new_quantity": quantity,
        }
        if (!new_modelId || new_modelId === "") 
        {
            updateResult = await CartService.updateQuantity(
                req.userid,
                productId,
                modelId,
                increaseBy
            )
        } 
        else {
            updateResult = await CartService.updateCartProduct(
                req.userid,
                productId,
                modelId,
                new_modelId,
                increaseBy
            );
            updatedItem["old_modleId"] = modelId
            updatedItem["new_modleId"] = new_modelId
        }


        if (!updateResult) throw new ServerError();

        new responseHelper.SuccessResponse({
            metadata: {
                cartId: updateResult._id,
                cartCountProduct: updateResult.cartCountProduct,
                updatedItem
            },
        }).send(res);
    };

    deleteCartItem = async(req, res, next) => {
        let { productId, modelId } = req.body;

        let deleteResult = await CartService.deleteItem(
            req.userid,
            productId,
            modelId
        );

        if (!deleteResult) {
            throw new BadRequestError('This product is not in your cart');
        }

        let { cartId, cartCountProduct } = deleteResult;

        new responseHelper.SuccessResponse({
            metadata: {
                cartId,
                cartCountProduct,
                deletedItem: deleteResult.deletedItem,
            },
        }).send(res);
    };

    deleteAllItems = async(req, res, next) => {
        new responseHelper.SuccessResponse({
            metadata: await CartService.deleteAllItems(req.userid),
        }).send(res);
    };
}

module.exports = new CartController();