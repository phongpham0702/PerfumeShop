const userModel = require("../models/users")
const {validationResult, check} = require('express-validator')
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const lifeTime = 7 * 24 * 60 * 60 * 1000;
const tokenCookieName = '__ut';

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
                
                if(!userInfo )
                {
                    return res.status(400).json({"message": fail_message})
                }
                
                let checkPassword = bcrypt.compareSync(Password, userInfo.Password);

                if(checkPassword === false)
                {
                    return res.status(400).json({"message": fail_message})
                }

                let accessToken = generateJWTToken(userInfo)

                res.cookie(tokenCookieName, accessToken,{
                    maxAge: lifeTime,
                    signed: true,
                    httpOnly: true
                })
                return res.status(200).json({"message": 'Sign In Success 🤗'})
            }           
        } 
        catch (error) 
        {
            console.error(error);
            return res.status(400).json({"message": 'Something wrong during sign in 😢'})   
        }
        
    } ,   
}

function generateJWTToken(userInfo)
{

    let accessToken = jwt.sign({
        UID: userInfo._id,
        Email: userInfo.Email,
        Password: userInfo.Password,
        admin: userInfo.IsAdmin
    },
        process.env.TOKEN_SECRET,
        {'expiresIn': lifeTime}
    )

    return accessToken;
}


module.exports = authController