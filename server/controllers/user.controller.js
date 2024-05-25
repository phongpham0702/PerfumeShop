const {validationResult} = require('express-validator');
const { SignUpInValid, BadRequestError } = require('../helpers/error.response');
const responseHelper = require("../helpers/success.response");
const UserService = require('../services/user.service');
const {Types} = require('mongoose')

class UserController{

    getUerProfile = async(req,res,next) => {
        new responseHelper.SuccessResponse({
            metadata: await UserService.getUserProfile(req.userid)
        }).send(res) 
    }

    addUserAddressList = async(req,res,next) => {
        
        let checkResult = await validationResult(req);
        
        if(checkResult.errors.length >= 1)
        {

            throw new BadRequestError()
        }
        else
        {   
            new responseHelper.SuccessResponse({
                metadata: await UserService.addUserAddressList(req.userid, req.body)
            }).send(res) 
        }

        
    }

    getWishList = async(req,res,next) => {

        new responseHelper.SuccessResponse({
            metadata: await UserService.getUserWishList(req.userid)
        }).send(res)
       
    }

    addWishList = async(req,res,next) => {

        if(!req.body.PID) throw new BadRequestError("Missing product ID")

        new responseHelper.SuccessResponse({
            metadata: await UserService.addWishList(req.userid, new Types.ObjectId(req.body.PID))
        }).send(res)

    }

    removeFromWishList = async(req,res,next) => {
        new responseHelper.SuccessResponse({
            metadata: await UserService.removeFromWishList(req.userid,new Types.ObjectId(req.body.PID))
        }).send(res)
    }
}


module.exports = new UserController();