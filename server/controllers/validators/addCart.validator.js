const {body} = require("express-validator");
const productModel = require('../../models/product');
const converterHelper = require("../../helpers/converter.helper");

const AddToCartValidator = [


    body('productData')
    .notEmpty().withMessage('Missing product data')
    .custom(async(productData) => {

        let checkProductData = await productModel.findOne({
            '_id': converterHelper.toObjectIdMongo(productData.productId),
            'priceScale._id': converterHelper.toObjectIdMongo(productData.modelId)
        },{'_id':1}).lean()

        if(!checkProductData)
        {
            throw new Error('Cannot find product')
        }

        return true;
    }),


    body('quantity')
    .notEmpty().withMessage('Missing quantity')
    .isNumeric().withMessage("Quantity is not valid")
    .custom((value) => {
        if(value > 0)
        {
            return true
        }
        throw new Error('Quantity is below zero')
    })



]


module.exports = AddToCartValidator