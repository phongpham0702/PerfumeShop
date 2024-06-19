const orderModel = require("../models/order.model");
const converterHelper = require("../helpers/converter.helper");
const productModel = require("../models/product");

//constant
const VOUCHER_PERCENT_TYPE = "discount_percent"
const VOUCHER_AMOUNT_TYPE = "discount_amount"

class OrderService {

    static async CreateOrder({
        ownerId,
        receiverData,
        userCartData,
        voucherData,
        subTotal,
        payment
    },transactionSession = null)
    {   
        
        let isApplyVoucher = voucherData? voucherData.checkResult :null
        let bulkOps = []
        let orderData = {
            ownerType: ownerId? "system_user":"guest",
            ownerId: ownerId? ownerId:null,
            receiverName: receiverData.receiverName,
            receiverEmail: receiverData.receiverEmail,
            receiverPhone: receiverData.receiverPhone,
            receiverAddress: receiverData.receiverAddress,
        }
        
        let discountAmount = 0
        if(isApplyVoucher){
            if(voucherData.voucherInfo.voucherType === VOUCHER_PERCENT_TYPE)
            {
                discountAmount = Math.round(subTotal*voucherData.voucherInfo.voucherDiscount);  
                
            }
            if(voucherData.voucherInfo.voucherType === VOUCHER_AMOUNT_TYPE)
            {
                discountAmount = Math.round(voucherData.voucherInfo.voucherDiscount);   
            }
            discountAmount = discountAmount > voucherData.voucherInfo.maxDiscountTotal? 
            voucherData.voucherInfo.maxDiscountTotal: discountAmount

            //decrease voucher quantity
            voucherData.voucherInfo.quantityLimit -= 1;
            await voucherData.voucherInfo.save({session:transactionSession})
        }
        
        //Add voucher information to order document
        orderData.applyVoucherTitle = isApplyVoucher ? voucherData.voucherInfo.voucherTitle : null;
        orderData.discount = discountAmount;
        
        //Create update operators list to update product in-stock quantity 
        //Create order products data list
        
        const orderCartData = userCartData.cartData.map(({productId, modelId, quantity, unitPrice}) => {
            let productIdMongo = converterHelper.toObjectIdMongo(productId)
            let modelIdMongo = converterHelper.toObjectIdMongo(modelId)
            bulkOps.push({
                "updateOne": {
                    filter:{"_id": productIdMongo, "priceScale._id": modelIdMongo },
                    update:{ "$inc":{
                            "sold": quantity,
                            "priceScale.$.inStock": - quantity
                        } 
                    }
                }
            })

            return {
                productId: productIdMongo,
                modelId: modelIdMongo,
                quantity: quantity,
                unitPrice: unitPrice
            }
        })

        const total = subTotal - discountAmount;
        
        //Add cart information to order document
        orderData.orderProducts = orderCartData
        orderData.productCount = userCartData.cartCountProduct
        orderData.subTotal = subTotal
        orderData.total = total

        //Add order status information
        orderData.orderStatus = payment === "online-payment" ? "pay-pending":"confirm-pending"
        orderData.orderPayment = payment

        //Create order
        const order = await orderModel.create([orderData], {session: transactionSession||undefined })
       
        //decrease product in-stock quantity 
        await productModel.bulkWrite(bulkOps,{session: transactionSession});

        return order;
    }

}


module.exports = OrderService