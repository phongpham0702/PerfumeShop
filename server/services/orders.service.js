const orderModel = require("../models/order.model");
const { BadRequestError } = require('../helpers/error.response');
const databaseInstance = require("../dbs/init.db")

//constant
const VOUCHER_PERCENT_TYPE = "discount_percent"
const VOUCHER_AMOUNT_TYPE = "discount_amount"

class OrderService {



    static async CreateOrder({
        ownerId,
        receiverData,
        userCartData,
        voucherData,
        orderTotal
    })
    {   


        let isApplyVoucher = voucherData? voucherData:null
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
                discountAmount = Math.round(orderTotal*voucherData.voucherInfo.voucherValue);   
            }
            if(voucherData.voucherInfo.voucherType === VOUCHER_AMOUNT_TYPE)
            {
                discountAmount = Math.round(voucherData.voucherInfo.voucherValue);   
            }
            discountAmount = discountAmount > voucherData.voucherInfo.maxDiscountPrice? 
            voucherData.voucherInfo.maxDiscountPrice: discountAmount
        }

        const total = orderTotal - discountAmount;
        
        const orderCartData = userCartData.cartData.map(({productCapacity,...rest}) => rest)
        orderData.orderProducts = orderCartData
        //order
        console.log(orderCartData);
        console.log(`Order total: ${orderTotal}`);
        console.log(`Discount amount: ${discountAmount}`);
        console.log(`Total: ${orderTotal-discountAmount}`);
        
        //const discount = orderTotal - (orderTotal*voucherData.voucherInfo.)

    }

}


module.exports = OrderService