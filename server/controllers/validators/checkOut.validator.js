const {body} = require("express-validator");
const emailFormatRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const checkOutValidator = [

    body("receiverName")
    .notEmpty().withMessage(
        "Missing receiverName."
    ),

    body("receiverEmail")
    .notEmpty().withMessage(
        "Missing receiverEmail."
    )
    .matches(emailFormatRegex).withMessage(
        "receiverEmail is not valid."
    ),

    body("receiverPhone")
    .notEmpty().withMessage(
        "Missing receiverPhone"
    )
    .isMobilePhone().withMessage("receiverPhone is not valid."),
    
    body("receiverAddress")
    .notEmpty().withMessage(
        "Missing receiverAddress."
    ),
]


module.exports = checkOutValidator