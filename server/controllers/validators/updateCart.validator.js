const {body} = require("express-validator");

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
    })



]


module.exports = UpdateCartValidator