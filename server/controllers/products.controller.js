const responseHelper = require("../helpers/success.response")
const {Types} = require('mongoose')
const ProductService = require("../services/products.service")



class ProductController 
{
    getProductPage = async (req,res,next) => {

        new responseHelper.OK({
            metadata: await ProductService.getProductPage(req.params.page, req.query)
        }).send(res)
    }

    getProductDetail = async(req,res,next) => {
        
        new responseHelper.OK({
            metadata: await ProductService.getProductDetail(new Types.ObjectId(req.params.pid))
        }).send(res)

    }

    getBestSeller = async(req,res,next) => {
        console.log(req.cookies);
        new responseHelper.OK({
            metadata: await ProductService.getBestSeller()
        }).send(res)
    }

    getNewArrival = async(req,res,next) => {
        new responseHelper.OK({
            metadata: await ProductService.getNewArrival()
        }).send(res)
    }

    searchProduct = async(req,res,next) => {
        let searchValue = req.params.value.replace(/[+\-_]/g," ")

        new responseHelper.OK({
            metadata: await ProductService.searchByName(searchValue)
        }).send(res)
    }

    getAllBrand = async(req,res,next) => {

        new responseHelper.OK({
            metadata: await ProductService.getAllBrand()
        }).send(res)

    }

}

module.exports = new ProductController()