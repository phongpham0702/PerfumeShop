const {validationResult} = require('express-validator')
const SignUpService = require("../services/signUp.service");
const { SignUpInValid } = require('../helpers/error.response');
const responseHelper = require("../helpers/success.response")

class SignUpController{

    signUp = async (req,res,next) => {

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
            throw new SignUpInValid( res_error)
        }
        else
        {
            new responseHelper.CREATED({
                metadata: await SignUpService.signUp(req.body)
            }).send(res)
        }

    }

}

module.exports = new SignUpController()