
const {validationResult} = require('express-validator')
const AuthService = require("../services/auth.service")
const responseHelper = require("../helpers/success.response");
const { AuthFailureError } = require('../helpers/error.response');
const { setUIDCookie, setRTCookie, setSIDCookie, setTokenIDCookie} = require('../helpers/cookieHelpers/setCookie.helper');
const encodeHelper = require('../helpers/encode.helper');

class AuthController{
    
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
            let result = await AuthService.login(req.body.Email,req.body.Password)
                        
            setTokenIDCookie(result.keyId, res)

            new responseHelper.SuccessResponse({
                metadata: {
                    userInfo: result.userInfo,
                    AT: result.accessToken,
                }
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
                metadata: await AuthService.logout(req.tokenid ,res)
            }).send(res)
        }

    }

    getNewToken = async(req,res,next) => {


        let result = await AuthService.handlerRefreshToken({
            refreshData: req.refreshData,
            keyStore: req.keyStore
        })
            
        new responseHelper.SuccessResponse({
            message:'Get new token success',
            metadata: {
                user: result.userInfo,
                AT: result.accessToken,
            }
        }).send(res)
    }

}

module.exports = new AuthController()