const userModel = require("../models/users")
const {validationResult} = require('express-validator')
const bcrypt = require('bcrypt');
const signUpController = 
{
    signUp: async (req,res,next) => {

        try 
        {    
            let checkResult = await validationResult(req);
            if(checkResult.errors.length >= 1)
            {
                let res_error = checkResult.errors.map((v) => {

                    return {
                        name: v.path,
                        value: v.value,
                        msg: v.msg
                    }

                })

                return res.status(400).json(res_error)
            }
            else
            {
                let {Email, Fullname, Phonenumber, Password, rePassword} = req.body;
                let DoB = new Date(req.body.DoB);
                let salt = parseInt(process.env.SALT_ROUNDS)
                let hashedPassword = bcrypt.hashSync(Password, salt)

                await userModel.create({
                            Email: Email,
                            Password: hashedPassword,
                            FullName: Fullname,
                            DoB: DoB,
                            PhoneNumber: Phonenumber
                })
                
                return res.status(200).json({"message": 'Sign Up Success 🤗'})
            }
            
        } 
        catch (error) 
        {
            console.log(error);
            return res.status(400).json({"message": 'Something wrong during sign up your account 😢'})   
        }
        
    }    
}

module.exports = signUpController