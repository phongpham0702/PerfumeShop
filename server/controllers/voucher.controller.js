const { BadRequestError } = require("../helpers/error.response");
const responseHelper = require("../helpers/success.response");
const VoucherService = require("../services/voucher.service");

class VoucherController{

    checkVoucher = async(req,res,next) => {

        const {orderTotal,voucherCode} = req.query

        if(!orderTotal) throw new BadRequestError()
        let checkVoucherResult = await VoucherService.checkVoucher(req.userid,orderTotal,voucherCode)

        if(!checkVoucherResult.checkResult.isValid)
        {
            throw new BadRequestError(checkVoucherResult.checkResult.checkMessage)
        }
        else{
                new responseHelper.SuccessResponse({
                    metadata: {
                        ...checkVoucherResult
                    }
            }).send(res)

        }
    }

}

module.exports = new VoucherController()