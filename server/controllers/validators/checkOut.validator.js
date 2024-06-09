const {body} = require("express-validator");
const emailFormatRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const orderPayment = ["cod-payment","online-payment"]
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

        if(orderPayment.includes(value))
        {
            return true;
        }
        else
        {
            return Promise.reject('Payment not support.');
        }
    })

]


module.exports = checkOutValidator