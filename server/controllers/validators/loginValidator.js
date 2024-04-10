const {body} = require("express-validator");
const userModel = require("../../models/users");

const signInValidator = [

    //#start check Email
    body('Email')
    .notEmpty().withMessage(
        'Please provide your Email.'
    ),

    //#end check Email


    //#start check password
    
    body('Password')
    .notEmpty().withMessage(
        'Please provide your Password'
    ),
    //#end check passwordd
]


module.exports = signInValidator