
const {validationResult} = require('express-validator')
const AuthService = require("../services/auth.service")
const responseHelper = require("../helpers/success.response");
const { AuthFailureError } = require('../helpers/error.response');
class AuthController{
    
    handlerToken = async(req,res,next) => {
        
    }

    local_login = async (req,res,next) => {
        
        let checkResult = await validationResult(req);
        
        if(checkResult.errors.length >= 1)
        {
            let res_error = checkResult.errors.map((v) => {

                return {
                    name: v.path,
                    value: v.value || "",
                    msg: v.msg
                }

            })
            throw new AuthFailureError(res_error)
        }
        else
        {
            new responseHelper.SuccessResponse({
                metadata: await AuthService.login(req.body.Email,req.body.Password)
            }).send(res)
        }
    }

    logout = async(req,res,next) => {

        if(!req.keyStore) 
        {
            throw new AuthFailureError("Invalid request")
        }
        else
        {
            new responseHelper.SuccessResponse({
                message:'Log out success',
                metadata: await AuthService.logout(req.keyStore)
            }).send(res)
        }

    }

}

module.exports = new AuthController()