const { BadRequestError } = require("../helpers/error.response");
const JWT = require('jsonwebtoken');
const productModel = require("../models/product");
const converterHelper = require("../helpers/converter.helper");
const uploadAvatar = require("../utils/upload.util");
const voucherModel = require("../models/voucher.model");
const orderModel = require("../models/order.model")
class AdminService{
    
    static AdminLogin = async(username, password) => {

        //check username
        let isUserNameCorrect = username === process.env.ADMIN_ACCOUNT;


        //check password
        let isPasswordCorrect = password === process.env.ADMIN_PASSWORD;

        if(!isUserNameCorrect || !isPasswordCorrect) throw new BadRequestError("incorrect credential");

        //create token
        let adminToken = await JWT.sign({
            isAdmin: true
        }, 
        process.env.ADMIN_SECRETKEY, 
        {
            expiresIn: '6h',
        });

        //return token        
        return adminToken;
    }

    static getAllProduct = async(pagenum = 1) => {
        const productPerPage = 20 ;
        const currentPage = pagenum ;
        let pipeLine = [
            {$skip : (productPerPage * currentPage) - productPerPage },
            {$limit : productPerPage},
            {
                '$project':
                {   
                    '_id':1,
                    'productName': 1,
                    'productBrand': 1,
                    'productThumbnail': 1,
                    'sold':1,
                    'createdAt': 1,
                    'updatedAt': 1
                }
            },
        ]

        let productList = await productModel.aggregate(pipeLine)


        return {
            productPerPage,
            currentPage,
            totalPage:Math.ceil(productList.length/productPerPage),
            productList
        }
    }

    static productDetail = async(productId) => {

        const foundProduct = await productModel.findOne({
            _id: converterHelper.toObjectIdMongo(productId)
        },{__v :0}).lean()
        return foundProduct;
    }

    static createProduct = async() => {
        
    }
    
    static getVoucherList = async() => {
        const voucherList = await voucherModel.find().lean();
        return {
            voucherList
        }
    }

    static createVoucher = async(voucherData) =>{
        
        let newVoucher = {
            "voucherCode" : voucherData.voucherCode,
            "voucherTitle":voucherData.voucherTitle,
            "voucherType": voucherData.voucherType,
            "voucherDiscount": voucherData.voucherDiscount,
            "voucherExp": voucherData.voucherExp,
            "quantityLimit":voucherData.quantityLimit,
            "maxDiscountTotal":voucherData.maxDiscountTotal,
            "usageTarget":voucherData.usageTarget,
            "minPriceTotal":voucherData.minPriceTotal
        }

        const createVoucher = await voucherModel.create(newVoucher);
        return {
            newVoucher: createVoucher
        }

    }

    static getPendingOrders = async(currentPage = 1)=>{
        const orderPerPage = 10;
        let pipeLine = [
            {$match: {orderStatus: {$in:["confirm-pending","paid"]}}},
            {$skip : (orderPerPage  * currentPage) - orderPerPage },
            {$limit : orderPerPage},
            {
                '$project':
                {   
                    _id:1,
                    receiverPhone:1,
                    receiverAddress:1,
                    productCount:1,
                    total:1,
                    orderPayment:1,
                    orderStatus:1,
                    createdAt:1
                }
            },

        ]
        const pendingOrders = await orderModel.aggregate(pipeLine)
        
        return {
            orderPerPage,
            currentPage,
            orderList:pendingOrders.map(({createdAt,...other}) => {
                return{
                    ...other,
                    createdAt: createdAt.toLocaleDateString("vi-VN")
                }
            })
        }
    }

}

module.exports = AdminService