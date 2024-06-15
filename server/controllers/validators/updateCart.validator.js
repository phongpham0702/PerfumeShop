const {body} = require("express-validator");
const { checkProductCapacity } = require("../../models/reposities/product.repo");
const { BadRequestError, ServerError } = require("../../helpers/error.response");

const UpdateCartValidator = [

    body('quantity')
    .notEmpty().withMessage('Missing quantity')
    .isNumeric().withMessage("Quantity is not valid")
    .custom((value) => {

        if(value > 0)
        {
            return true
        }
        throw new Error('Quantity is below zero')
    }),

    body("new_modelId")
    .custom(async (value, {req}) => {
        
        if(!value) return true;
        
        try 
        {
            console.log(value);
            let checkModelValid = await checkProductCapacity(req.body.productId,value)
            
            if(!checkModelValid)
            {
                throw new BadRequestError("Cannot find this product model.")
            }
            return true;    
        } 
        catch (error) {
            throw new ServerError()
        }
    }),

    body()
    .custom(async (value) => {

        let {new_modelId, quantity} = value 

        console.log(quantity);

    })
]


module.exports = UpdateCartValidator