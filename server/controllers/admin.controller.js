const {validationResult} = require('express-validator');
const { BadRequestError, ServerError } = require('../helpers/error.response');
const responseHelper = require("../helpers/success.response");
const AdminService = require('../services/admin.service');
const ORDER_STATUS = ["pending","complete","confirmed","in-delivery"]
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

    GetOrdersCount = async(req,res,next) => {
        
    }
        
    GetSaleData = async (req,res,next) => {

    }

    GetProducts = async(req,res,next) => {

        let page = req.params.page ? parseInt(req.params.page) : 1
       
        if(!page){page = 1} 
        
        new responseHelper.SuccessResponse({
        metadata:{
            productList: await AdminService.getProduct(page,req.query.search)
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
        const e = req.body.mainScent.toArray()
        console.log(e);
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

    GetOrders = async(req,res,next) => {
        if(!req.params.page) throw new BadRequestError("Missing page");
        const page = parseInt(req.params.page)

        if(Number.isNaN(page)) throw new BadRequestError("Page is NaN");

        if(req.query.status && !ORDER_STATUS.includes(req.query.status)) throw new BadRequestError("Invalid status");
        
        new responseHelper.OK({
            metadata: await AdminService.getOrders(page,req.query.status)
        }).send(res)
    }

    ConfirmOrder = async(req,res,next) => {
        if(!req.body.orderId) throw new BadRequestError("Please provide order ID")

         const confirmOrder = await AdminService.confirmOrder(req.body.orderId)
         
         new responseHelper.OK({
            metadata:{
                orderId: confirmOrder._id.toString(),
                status: confirmOrder.orderStatus
            }
            
         }).send(res)

    }

    RejectOrder = async(req,res,next) => {
        if(!req.body.orderId) throw new BadRequestError("Please provide order ID")

        const rejectOrder = await AdminService.rejectOrder(req.body.orderId)
        
        new responseHelper.OK({
            metadata:{
                orderId: rejectOrder._id.toString(),
                status: rejectOrder.orderStatus
            }
            
        }).send(res)
    }
    
    deliveryOrder = async(req,res,next)=>{
        if(!req.body.orderId) throw new BadRequestError("Please provide order ID")

        const deliveryOrder = await AdminService.deliveryOrder(req.body.orderId)
        
        new responseHelper.OK({
            metadata:{
                orderId: deliveryOrder._id.toString(),
                status: deliveryOrder.orderStatus
            }
            
        }).send(res)
    }

    completeOrder = async(req,res,next) => {
        if(!req.body.orderId) throw new BadRequestError("Please provide order ID")

        const completeOrder = await AdminService.completeOrder(req.body.orderId)
        
        new responseHelper.OK({
            metadata:{
                orderId: completeOrder._id.toString(),
                status: completeOrder.orderStatus
            }
            
        }).send(res)
    }

}

module.exports = new AdminController();