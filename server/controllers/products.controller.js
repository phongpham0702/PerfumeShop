const responseHelper = require("../helpers/success.response")
const {Types} = require('mongoose')
const ProductService = require("../services/products.service")



class ProductController 
{
    getProduct = async (req,res,next) => {

        new responseHelper.OK({
            metadata: await ProductService.getProducts(req.params.page, req.query)
        }).send(res)
    }

    getProductDetail = async(req,res,next) => {
        
        new responseHelper.OK({
            metadata: await ProductService.productDetail(new Types.ObjectId(req.params.pid))
        }).send(res)

    }

    getBestSeller = async(req,res,next) => {
        new responseHelper.OK({
            metadata: await ProductService.bestSeller()
        }).send(res)
    }

    getNewArrival = async(req,res,next) => {
        new responseHelper.OK({
            metadata: await ProductService.newArrival()
        }).send(res)
    }

    searchProduct = async(req,res,next) => {
        let searchValue = req.params.value.replace(/[+\-_]/g," ")

        new responseHelper.OK({
            metadata: await ProductService.searchByName(searchValue)
        }).send(res)
    }
}

module.exports = new ProductController()