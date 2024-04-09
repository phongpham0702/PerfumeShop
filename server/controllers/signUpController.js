const userModel = require("../models/users")
const {validationResult} = require('express-validator')

const signUpController = 
{
    signUp: async (req,res,next) => {

        try 
        {   
            console.log(req.body);
            let gmail = req.body.Gmail
            let dob = new Date(req.body.DoB)
            let  fullname = req.body.fullname
            let PhoneNumber = req.body.Phonenumber
            let password = req.body.Password
            // console.log(new Date(Date.now()).getTime());
            // console.log(dob.getTime());
            // console.log(dob.toLocaleDateString());
            let checkResult = await validationResult(req)
            console.log(checkResult.errors);
            // await userModel.create({
            //     Email: gmail,
            //     Password: password,
            //     FullName: fullname,
            //     DoB: dob,
            //     PhoneNumber: PhoneNumber
            // })

            return res.status(200).json({"msg":"success"})
        } 
        catch (error) 
        {
            console.log(error);
            next()    
        }
        
    }    
}

module.exports = signUpController