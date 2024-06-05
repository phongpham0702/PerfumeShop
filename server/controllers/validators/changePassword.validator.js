const {body} = require("express-validator");
const userModel = require("../../models/users");
const onlyNumbersRegex = /^[0-9]+$/;
const emailFormatRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const changePasswordValidator = [

    
    body("oldPassword")
    .notEmpty().withMessage(
        'Please provide your current password'
    ),

    body('Password')
    .notEmpty().withMessage(
        'Please fill in your password'
    )
    .isLength({min: 8})
    .withMessage('Password must contain at least 8 characters.'),

    body('rePassword')
    .notEmpty().withMessage('Please confirm your password')
    .custom((value, { req }) => {
        if(value === undefined)
        {
            throw new Error('Please confirm your password');
        }
        if (value !== req.body.Password) {
            throw new Error('Confirm passwords does not match');
        }
        return true;
    })

]


module.exports = changePasswordValidator