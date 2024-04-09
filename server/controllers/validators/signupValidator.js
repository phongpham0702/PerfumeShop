const {check,body} = require("express-validator");
const userModel = require("../../models/users");
const onlyNumbersRegex = /^[0-9]+$/;
const emailFormatRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const signUpValidator = [

    //#start checkEmail
    body('Gmail')
    .exists().withMessage({
        message: 'Please fill in your Email.'
    })
    .notEmpty().withMessage({
        message: 'Please fill in your Email.'
    })
    .not().matches(emailFormatRegex).withMessage({
        message: 'This email is not valid'
    })

    //#end checkEmail


]


module.exports = signUpValidator