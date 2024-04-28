const { SignUpInValid, BadRequestError } = require('../helpers/error.response');
const responseHelper = require("../helpers/success.response");
const UserService = require('../services/user.service');
const {Types} = require('mongoose')
const HEADER = {
    CLIENT_ID:'x-client-id',
}

class UserController{

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