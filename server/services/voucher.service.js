const { BadRequestError } = require("../helpers/error.response");
const voucherModel = require("../models/voucher.model");

const checkVoucherStatusCode = {
    VALID: "CR-01",
    OUT_DATED: "CR-02",
    OUT_STOCK: "CR-03",
    NOT_REACH_MINPRICE: "CR-04",
    NOT_PUBLIC_VOUCHER:"CR-05"
}

const checkVoucherStatusMessage = {
    VALID: "Valid voucher",
    OUT_DATED: "This voucher has expired",
    OUT_STOCK: "Voucher has been used up",
    NOT_REACH_MINPRICE: "Your order value has not met the requirements",
    NOT_PUBLIC_VOUCHER: "Please login to use this voucher"
}

class VoucherService{
    
    static checkVoucher = async(userId, orderTotalPrice,voucherCode, session = null) => {
        
        const foundVoucher = await voucherModel.findOne({
            "voucherCode": voucherCode
        },
        {},
        {session: session || undefined }).lean()
        
        if(!foundVoucher)
        {
            throw new BadRequestError("Voucher code is not valid")
        }

        const nowTime = new Date(Date.now())

        if(nowTime >= foundVoucher.voucherExp)
        {
            return {
                checkResult:{
                    checkCode: checkVoucherStatusCode.OUT_DATED,
                    checkMessage: checkVoucherStatusMessage.OUT_DATED,
                    isValid: false
                }
            }
        }

        if(foundVoucher.quantityLimit <= 0)
        {
            return {
                checkResult:{
                    checkCode: checkVoucherStatusCode.OUT_STOCK,
                    checkMessage: checkVoucherStatusMessage.OUT_STOCK,
                    isValid: false
                }
            }
        }

        if(orderTotalPrice < foundVoucher.minPriceTotal)
        {
            return {
                checkResult:{
                    checkCode: checkVoucherStatusCode.NOT_REACH_MINPRICE,
                    checkMessage: checkVoucherStatusMessage.NOT_REACH_MINPRICE,
                    isValid: false
                }
            }
        }

        if(foundVoucher.usageTarget !== "all" && !userId)
        {
            return {
                checkResult:{
                    checkCode: checkVoucherStatusCode.NOT_PUBLIC_VOUCHER,
                    checkMessage: checkVoucherStatusMessage.NOT_PUBLIC_VOUCHER,
                    isValid: false
                }
            }
        }


        return{
            checkResult:{
                    checkCode: checkVoucherStatusCode.VALID,
                    checkMessage: checkVoucherStatusMessage.VALID,
                    isValid: true
            },
            voucherInfo:{
                "voucherTitle": foundVoucher.voucherTitle,
                "voucherType": foundVoucher.voucherType,
                "voucherValue": foundVoucher.voucherDiscount,
                "minOrderTotal": foundVoucher.minPriceTotal,
                "maxDiscountPrice": foundVoucher.maxDiscountTotal
            }
        } 
        
    }

}

module.exports = VoucherService;