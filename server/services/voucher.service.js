const voucherModel = require("../models/voucher.model");

const checkVoucherStatusCode = {
    VALID: "CR-01",
    OUT_DATED: "CR-02",
    OUT_STOCK: "CR-03",
    NOT_REACH_MINPRICE: "CR-04"
}

const checkVoucherStatusMessage = {
    VALID: "Valid voucher",
    OUT_DATED: "This voucher has expired",
    OUT_STOCK: "Voucher has been used up",
}

class VoucherService{

    static checkVoucher = async(userId, orderTotalPrice,voucherCode) => {
         
        const foundVoucher = await voucherModel.findOne({
            "voucherCode": voucherCode
        }).lean()

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
                    checkCode: checkVoucherStatusCode.OUT_STOCK,
                    checkMessage: checkVoucherStatusMessage.OUT_STOCK,
                    isValid: false
                }
            }
        }


        return foundVoucher
    }

}

module.exports = VoucherService;