const { BadRequestError } = require("../helpers/error.response");
const JWT = require('jsonwebtoken');
const productModel = require("../models/product");
const converterHelper = require("../helpers/converter.helper");
const uploadAvatar = require("../utils/upload.util");
const voucherModel = require("../models/voucher.model");
const orderModel = require("../models/order.model");
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

    static ordersCount = async()=>{
        const data = {
            confirmPending:0,
            paid:0,
            confirmed:0,
            inDelivery:0,
            cancelled:0,
            completed:0
        }
        const pipeLine = [
            {
                $group:{
                    _id:"$orderStatus",
                    count:{
                        $sum:1
                    }
                }
            }
        ]
        const countList = await orderModel.aggregate(pipeLine);

        for(let i of countList){
           switch (i._id) {
            case 'confirm-pending':
                data.confirmPending = i.count;
                break;
            case 'paid':
                data.paid = i.count;
                break;
            case 'confirmed':
                data.confirmed = i.count;
                break;
            case 'in-delivery':
                data.inDelivery = i.count;
                break;
            case 'complete':
                data.completed = i.count;
                break;
            case 'pay-pending':
                break;
            default:
                data.cancelled = i.count;
                break;
           }
        }

        return data
    } 

    static saleData = async(year) => {
        const pipeLine = [
            {
                $project:{
                    year: {$year:"$createdAt"},
                    createdAt:1,
                    total:1,
                    orderStatus:1
                  }
            },
            {
                $match: {
                    orderStatus:"complete",
                    year:{$eq:year}
                }
            },
            {
                $group:{
                    _id:{$month:"$createdAt" },
                    profit:{$sum:"$total"}
                }
            },
            {
                $project:{
                    month: "$_id",
                    _id:0,
                    profit: 1
                }
            }
        ];

        const profitData = await orderModel.aggregate(pipeLine);
        const monthSaleData = Array(12).fill(null,0,12)
        
        for(let i of profitData){
            monthSaleData[i.month-1] = i
        }

        for(let i in monthSaleData){
            monthSaleData[i] = monthSaleData[i]?monthSaleData[i]: {profit:0, month:parseInt(i)+1}
        }
        
        return monthSaleData;
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
            pipeLine.unshift(...searchPipeLine)
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

    static getOrders = async(currentPage = 1, status = null, sortOrder = 1)=>{
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
                matchCondition.orderStatus = {$nin:["pay-pending"]}
                break;
        }

        let pipeLine = [
            {$sort: {createdAt: sortOrder}},
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

    static oderDetail = async(orderId)=>{
        const order = await orderModel.findOne({
            _id: orderId
        },{__v:0}).lean()
        
        return order
    }

    static confirmOrder = async(orderId) => {
        const findOrder = await orderModel.findOne({
            _id: orderId
        },{orderStatus:1})
        
        if(!findOrder) throw new BadRequestError("Invalid ID");

        if((findOrder.orderStatus !== "confirm-pending")&&
        (findOrder.orderStatus !== "paid")) throw new BadRequestError("Cannot confirm this order")

        findOrder.orderStatus = "confirmed"
        await findOrder.save()
        return findOrder;
    }

    static rejectOrder = async(orderId) => {
        const findOrder = await orderModel.findOne({
            _id: orderId
        },{orderStatus:1})
        
        if(!findOrder) throw new BadRequestError("Invalid ID");

        if((findOrder.orderStatus !== "confirm-pending")&&
        (findOrder.orderStatus !== "paid")) throw new BadRequestError("Cannot reject this order")

        findOrder.orderStatus = "cancelled"
        await findOrder.save()
        return findOrder;
    }

    static deliveryOrder = async(orderId) => {
        const findOrder = await orderModel.findOne({
            _id: orderId
        },{orderStatus:1})
        
        if(!findOrder) throw new BadRequestError("Invalid ID");

        if(findOrder.orderStatus !== "confirmed") throw new BadRequestError("Cannot delivery this order")

        findOrder.orderStatus = "in-delivery"
        await findOrder.save()
        return findOrder;
    }
    
    static completeOrder = async(orderId) => {
        const findOrder = await orderModel.findOne({
            _id: orderId
        },{orderStatus:1})
        
        if(!findOrder) throw new BadRequestError("Invalid ID");

        if(findOrder.orderStatus !== "in-delivery") throw new BadRequestError("Cannot complete this order. Order must be delivered before completed")

        findOrder.orderStatus = "complete"
        await findOrder.save()
        return findOrder;
    }

    static outOfStock = async() => {
        const pipeLine = [
            {
                $unwind:{
                    path: "$priceScale",
                    includeArrayIndex: 'modelIdx',
                    preserveNullAndEmptyArrays: false
                }
            },
            {
                $match:{
                    "priceScale.inStock":0
                }
            },
            {
                $project:{
                    _id:1,
                    productName:1,
                    priceScale:1
                }
            }
        ]

        const outOfStockProducts = await productModel.aggregate(pipeLine)

        return outOfStockProducts;

    }

    static fillStock = async(productId, modelId, amount) => {
        
    }
}

module.exports = AdminService