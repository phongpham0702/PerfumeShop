const {body} = require("express-validator");

const AddAddressValidator = [


    body('receiverName')
    .notEmpty()
    .withMessage('Missing receiverName'),

    body('receiverPhone')
    .notEmpty()
    .withMessage('Missing receiverPhone')
    .isMobilePhone()
    .withMessage('Not phonenumber'),

    body('nation')
    .notEmpty()
    .withMessage('Missing nation'),
    
    body('city')
    .notEmpty()
    .withMessage('Missing city'),

    body('district')
    .notEmpty()
    .withMessage('Missing district'),

    body('ward')
    .notEmpty()
    .withMessage('Missing ward'),

    body('detail')
    .notEmpty()
    .withMessage('Missing detail'),
]


module.exports = AddAddressValidator