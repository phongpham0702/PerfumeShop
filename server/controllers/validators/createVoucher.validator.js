const {body} = require("express-validator");
const Valid_Voucher_Type = ["discount_percent","discount_amount"]
const Valid_Voucher_Usage = ["system_users","all"]
const CreateVouchewrValidator = [


    body('voucherCode')
    .notEmpty()
    .withMessage('Missing voucherCode'),

    body('voucherTitle')
    .notEmpty()
    .withMessage('Missing voucherTitle'),

    body('voucherType')
    .notEmpty()
    .withMessage('Missing nation')
    .custom((value) => {

        const isValidType = Valid_Voucher_Type.includes(value)
        if(isValidType){
            return true
        }
        else
        {
            throw new Error("Voucher type must be discount_percent or discount_amount")
        }

    }),
    
    body('voucherDiscount')
    .notEmpty()
    .withMessage('Missing voucherDiscount')
    .isNumeric()
    .withMessage('voucherDiscount must be a number'),

    body('voucherExp')
    .notEmpty()
    .withMessage('Missing voucherExp')
    .isDate()
    .withMessage('voucherExp must be a string in format YYYY/MM/DD'),
    
    body('quantityLimit')
    .notEmpty()
    .withMessage('Missing quantityLimit')
    .isInt()
    .withMessage("quantityLimit must be an integer number"),

    body('maxDiscountTotal')
    .notEmpty()
    .withMessage('Missing maxDiscountTotal')
    .isInt()
    .withMessage('maxDiscountTotal must be an integer number'),

    body('usageTarget')
    .notEmpty()
    .withMessage('Missing usageTarget')
    .custom((value) => {

        const isValidType = Valid_Voucher_Usage.includes(value)
        if(isValidType){
            return true
        }
        else
        {
            throw new Error("Voucher type must be system_users or all")
        }

    }),

    body('minPriceTotal')
    .notEmpty()
    .withMessage('Missing minPriceTotal')
    .isInt()
    .withMessage('minPriceTotal must be an integer number'),
]


module.exports = CreateVouchewrValidator