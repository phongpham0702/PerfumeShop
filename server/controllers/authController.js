const userModel = require("../models/users")
const {validationResult, check} = require('express-validator')
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

const authController = 
{
    local_auth: async (req,res,next) => {

        try 
        {    
            let checkResult = await validationResult(req);

            if(checkResult.errors.length >= 1)
            {
                let res_error = checkResult.errors.map((v) => {

                    return{
                        name: v.path,
                        value: v.value,
                        msg: v.msg
                    }

                })
                return res.status(400).json(res_error)
            }
            else
            {   
                const fail_message = "Email or Password is not correct."
                let {Email,Password} = req.body

                let userInfo = await userModel.findOne({"Email": Email})
                
                if((userInfo === null || userInfo === undefined))
                {
                    return res.status(400).json({"message": fail_message})
                }
                
                let checkPassword = bcrypt.compareSync(Password, userInfo.Password);

                if(checkPassword === false)
                {
                    return res.status(400).json({"message": fail_message})
                }
               console.log(userInfo); 
                let accessToken = jwt.sign({
                    Email: userInfo.Email,
                    Password: userInfo.Password,
                    admin: userInfo.IsAdmin
                },
                    process.env.TOKEN_SECRET,
                    {'expiresIn':'2h'}
                )
                console.log(accessToken);

                let decode = jwt.decode(accessToken,process.env.TOKEN_SECRET)
                console.log(decode);
                console.log(new Date(decode.iat));
                console.log(new Date(decode.exp));
            }

            return res.status(200).json({"message": 'Success'})   
        } 
        catch (error) 
        {
            console.log(error);
            return res.status(400).json({"message": 'Something wrong during sign up your account 😢'})   
        }
        
    } ,   

    testToken: async(req,res,next) => {
        console.log(req.body.token);
        let t = req.body.token
        let result = await jwt.verify(t,process.env.TOKEN_SECRET)
        console.log(result);
        return res.status(200).json({"message": 'Success'}) 

    }
}

module.exports = authController