const {validationResult} = require('express-validator');
const { BadRequestError, ServerError } = require('../helpers/error.response');
const responseHelper = require("../helpers/success.response");
const AdminService = require('../services/admin.service');

class AdminController {
    
    AdminAuthenticate = async(req,res,next) => {
        let {username,password} = req.body

        if(!username || !password) throw new BadRequestError("incorrect credential");

        let adminToken = await AdminService.AdminLogin(username,password);

        new responseHelper.OK({
            metadata:{
                adminToken: adminToken
            }
        }).send(res);

    }

    GetSaleData = async (req,res,next) => {

    }

    GetAllProducts = async(req,res,next) => {

        let page = req.params.page ? parseInt(req.params.page) : 1
       
        if(!page){page = 1} 
        
        new responseHelper.SuccessResponse({
        metadata:{
            productList: await AdminService.getAllProduct(page)
        }
        }).send(res)
        
    }

    GetProductDetail = async(req,res,next) => {

        const pid = req.params.pid

        if(!pid) throw new BadRequestError();

        const foundProduct = await AdminService.productDetail(pid);

        if(!foundProduct) throw new BadRequestError("No product was found")

        new responseHelper.SuccessResponse({
            metadata:{
                foundProduct
            }
        }).send(res)
    }

    CreateNewProduct = async(req,res,next) => {

        console.log(req.body);
        console.log(req.file);
        new responseHelper.CREATED({
            metadata:{

            }
        }).send(res)
    }

    GetVoucherList = async(req,res,next) => {

        const voucherList = await AdminService.getVoucherList();
        new responseHelper.SuccessResponse({
            metadata:{
                ...voucherList
            }
        }).send(res);

    }

    CreateVoucher = async(req,res,next) => {

        let checkResult = await validationResult(req);
        if(checkResult.errors.length >= 1)
        {
            
            throw new BadRequestError(checkResult.errors[0].msg)
        }

        new responseHelper.CREATED({
            metadata: await AdminService.createVoucher(req.body)
        }).send(res);
    }

    GetPendingOrders = async(req,res,next) => {

        if(!req.params.page) throw new BadRequestError("Missing page");
        const page = parseInt(req.params.page)

        if(Number.isNaN(page)) throw new BadRequestError("Page is NaN");

        new responseHelper.OK({
            metadata: await AdminService.getPendingOrders(page)
        }).send(res)
    }
}

module.exports = new AdminController();