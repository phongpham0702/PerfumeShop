const {check,body} = require("express-validator");
const userModel = require("../../models/users");
const onlyNumbersRegex = /^[0-9]+$/;
const emailFormatRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const signUpValidator = [

    //#start check Email
    body('Gmail')
    .notEmpty().withMessage(
        'Please fill in your Email.'
    )
    .matches(emailFormatRegex).withMessage(
        'This email is not valid.'
    )
    .custom( async(value) => {

        try 
        {
            let existingUser = await userModel.findOne({Email: value});
            if(existingUser)
            {
                return Promise.reject('This email has already been taken.');
            }

            return true;
        } 
        catch (error) 
        {   
            
            throw new Error('Something went wrong while checking email availability.');
            
        }

    }),

    //#end check Email

    //#start check Fullname 

    body('Fullname')
    .notEmpty().withMessage(
       'Please fill in your Fullname.'
    ),

    //#endregion check Fullname

    //#start check DoB 

    body('DoB')
    .notEmpty().withMessage(
        'Please fill in your date of birth'
    )
    .custom( async(value) => {

        try 
        {
            let user_birth_date = new Date(value)
            let current_date = new Date(Date.now())
            if(user_birth_date.getTime() >= current_date.getTime())
            {
                return Promise.reject('Your birthday is not valid.');
            }

            return true;
        } 
        catch (error) 
        {   
            
            throw new Error('Something went wrong while checking birthday availability.');
            
        }

    }),


    //#end check DoB

    //#start check phone number
    body('Phonenumber')
    .notEmpty().withMessage(
        'Please fill in your phonenumber'
    )
    .isMobilePhone().withMessage("Your phone number is not valid."),

    //#end check phone number

    //#start check password
    
    body('Password')
    .notEmpty().withMessage(
        'Please fill in your password'
    )
    .isLength({min: 12})
    .withMessage('Password must contain at least 12 characters.')

    //#end check passwordd
]


module.exports = signUpValidator