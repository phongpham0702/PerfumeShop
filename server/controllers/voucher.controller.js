const { BadRequestError } = require("../helpers/error.response");
const responseHelper = require("../helpers/success.response");
const VoucherService = require("../services/voucher.service");
const { authentication } = require("../utils/auth.util");
const HEADER = {
    AUTHORIZATION: 'authorization',
}
class VoucherController{

    checkVoucher = async(req,res,next) => {

        const totalPrice = req.query.orderTotalPrice
        
        if(!totalPrice) throw new BadRequestError()

        new responseHelper.SuccessResponse({
            metadata: await VoucherService.checkVoucher(req.userId,totalPrice,"TESTCODE10")
        }).send(res)

    }

}

module.exports = new VoucherController()