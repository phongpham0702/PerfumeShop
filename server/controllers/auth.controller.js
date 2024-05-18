
const {validationResult} = require('express-validator')
const AuthService = require("../services/auth.service")
const responseHelper = require("../helpers/success.response");
const { AuthFailureError } = require('../helpers/error.response');
const { setUIDCookie, setRTCookie} = require('../helpers/cookieHelpers/setCookie.helper');

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
            
            /* res.cookie('_uid_',result.userInfo.userId, 
            { 
                httpOnly: true,
                secure: false,
                sameSite: 'Lax',
                maxAge: 604800000,
                sign: true
            }) */

            setUIDCookie(result.userInfo.userId,res)
            /* res.cookie('uRT', result.refreshToken,{
                httpOnly: true,
                secure: false,
                sameSite: 'Lax',
                maxAge: 604800000,
                sign: true
            }) */
            setRTCookie(result.refreshToken,res)
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
                metadata: await AuthService.logout(req.userid,res)
            }).send(res)
        }

    }

    getNewToken = async(req,res,next) => {


        let result = await AuthService.handlerRefreshToken({
            refreshToken : req.refreshToken,
            userId: req.userid,
            keyStore: req.keyStore
        })
            
        setUIDCookie(result.userInfo.userId,res)

        setRTCookie(result.refreshToken,res)

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