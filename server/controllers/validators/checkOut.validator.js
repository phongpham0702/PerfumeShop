const {body} = require("express-validator");
const emailFormatRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


const SUPPORTED_PAYMENT_METHOD = ["cod-payment","online-payment"]

const checkOutValidator = [

    body("receiverName")
    .notEmpty().withMessage("Missing receiverName."),

    body("receiverEmail")
    .notEmpty().withMessage("Missing receiverEmail.")
    .matches(emailFormatRegex).withMessage("receiverEmail is not valid." ),

    body("receiverPhone")
    .notEmpty().withMessage("Missing receiverPhone")
    .isMobilePhone().withMessage("receiverPhone is not valid."),
    
    body("receiverAddress")
    .notEmpty().withMessage( "Missing receiverAddress."),

    body("orderPayment")
    .notEmpty().withMessage("Missing orderPayment")
    .custom((value) => {

        if(SUPPORTED_PAYMENT_METHOD.includes(value))
        {
            return true;
        }
        else
        {
            return Promise.reject('Payment method is not supported.');
        }
    })

]


module.exports = checkOutValidator