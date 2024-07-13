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

    static getProduct = async(pagenum = 1, search) => {
        const productPerPage = 20 ;
        const currentPage = pagenum ;
        let productCount = 0;
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
        if(search){
            let searchValue = search.replace(/[+\-_]/g," ")
            let searchPipeLine = [{    
                $addFields:{
                    'fullName': { $concat: ["$productBrand"," ","$productName"] }
                }
            },
            {
                $match:{
                    "fullName": { $regex: searchValue.toString(), $options: "i" }
                }  
            },
            {
                $project:{
                    "fullName":0
                }
            }]
            pipeLine.unshift(searchPipeLine)
            productCount = await  productModel.aggregate([...searchPipeLine].concat([{'$count':'count'}]))
            productCount = productCount[0] ? productCount[0].count:0
        }
        else
        {
            productCount = await productModel.countDocuments();
        }
        let page_num = productCount === 0 ? 1 : Math.ceil(productCount/productPerPage)
        let productList = await productModel.aggregate(pipeLine)
        if(currentPage > page_num){
            throw new BadRequestError("This page is not exist")
        }
        return {
            productPerPage,
            currentPage,
            productCount,
            totalPage:page_num,
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

    static getOrders = async(currentPage = 1, status = null)=>{
        const orderPerPage = 10;
        const matchCondition ={}
   
        switch (status) {
            case "pending":
                matchCondition.orderStatus = {$in:["confirm-pending","paid"]}
                break;
            case "complete":
                matchCondition.orderStatus = {$in:["complete"]}
                break;
            case "confirmed":
                matchCondition.orderStatus = {$in:["confirmed"]}
                break;
            case "in-delivery":
                matchCondition.orderStatus = {$in:["in-delivery"]}
                break;
            default:
                break;
        }

        let pipeLine = [
            {$match:matchCondition},
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
        const totalOrder = await orderModel.countDocuments(matchCondition)

        return {
            orderPerPage,
            totalPage: Math.ceil(totalOrder/orderPerPage),
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