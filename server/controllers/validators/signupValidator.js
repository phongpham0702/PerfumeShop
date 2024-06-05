const {body} = require("express-validator");
const userModel = require("../../models/users");
const onlyNumbersRegex = /^[0-9]+$/;
const emailFormatRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const signUpValidator = [

    //#start check Email
    body('Email')
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
    .isMobilePhone().withMessage("Your phone number is not valid.")
    .custom( async(value) => {

        try 
        {
            let existingPhoneNumber = await userModel.findOne({PhoneNumber: value});
            if(existingPhoneNumber)
            {
                return Promise.reject('This phone number has already been taken.');
            }

            return true;
        } 
        catch (error) 
        {   
            
            throw new Error('Something went wrong while checking phone number availability.');
            
        }

    }),
    //#end check phone number

    //#start check password
    
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

    //#end check passwordd
]


module.exports = signUpValidator