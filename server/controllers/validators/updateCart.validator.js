const {body, check} = require("express-validator");

const UpdateCartValidator = [

    body('productId')
    .notEmpty().withMessage('Missing productId'),

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
]


module.exports = UpdateCartValidator