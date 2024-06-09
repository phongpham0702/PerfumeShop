const {validationResult} = require('express-validator');
const { SignUpInValid, BadRequestError } = require('../helpers/error.response');
const responseHelper = require("../helpers/success.response");
const UserService = require('../services/user.service');
const {Types} = require('mongoose');
const { createRefreshToken } = require('../utils/token.util');
const converterHelper = require('../helpers/converter.helper');

class UserController{

    getUerProfile = async(req,res,next) => {
        new responseHelper.SuccessResponse({
            metadata: await UserService.getUserProfile(req.userid)
        }).send(res) 
    }

    changePassword = async(req,res,next) => {

        let checkResult = await validationResult(req);

        if(checkResult.errors.length >= 1)
        {
            
            throw new BadRequestError(checkResult.errors[0].msg)
        }

        let {oldPassword,Password} = req.body
        const changePasswordResult = await UserService.changePassword(req.userid,oldPassword,Password)

        /* Update new refresh token to key store */
        let userKeyStore = req.keyStore
        let newTokenData = {
            userId: changePasswordResult._id,
            userPass: changePasswordResult.Password
        }
        
        let newRefreshToken = await createRefreshToken({
            ...newTokenData
        },userKeyStore.privateKey)

        let futureExpire = Date.now() + parseInt(process.env.REFRESH_TOKEN_TIME) + 86400000;
        let expireAt = new Date(futureExpire)

        userKeyStore.refreshToken = newRefreshToken;
        userKeyStore.expireAt = expireAt;

        userKeyStore.save();
        /* Update new refresh token to key store */
        new responseHelper.SuccessResponse({
            metadata: {
                message: "Your password is changed"
            }
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

    deleteUserAddress = async(req,res,next) => {
        const deleteAddressID = req.body.deleteID 
        let deleteResult = await UserService.deleteUserAddress(req.userid,deleteAddressID)

        new responseHelper.SuccessResponse({
            metadata: {
                ...deleteResult
            } 
        }).send(res)
    }

    editUserAddress = async(req,res,next) => {

        let checkResult = await validationResult(req);
        
        if(checkResult.errors.length >= 1)
        {

            throw new BadRequestError()
        }
        else
        {    
            const addressID = converterHelper.toObjectIdMongo(req.body.addressID)
            let {receiverName,receiverPhone,nation,city,district,ward,detail} = req.body
            let dataPack = {receiverName,receiverPhone,nation,city,district,ward,detail}
            new responseHelper.SuccessResponse({
                metadata: await UserService.editUserAddress(req.userid,addressID,dataPack)
            }).send(res)
        }  
    }

    setDefaultAddress = async(req,res,next) => {

        const newDefaultID = req.query.default
        
        if(!newDefaultID) throw new BadRequestError("Provide your new address ID")

        new responseHelper.SuccessResponse({
            metadata: await UserService.setDefaultAddress(req.userid, newDefaultID)
        }).send(res)

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