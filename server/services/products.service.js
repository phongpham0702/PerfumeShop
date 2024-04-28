const productModel = require('../models/product')
const PipeLineGenerator = require('../helpers/pipeline.generator')
const {BadRequestError, ServerError} = require('../helpers/error.response')
const converterHelper = require('../helpers/converter.helper')
const { findSimilarProducts } = require('../models/reposities/product.repo')

class ProductService
{

    static getProductPage = async (currentPage = 1, Filter = {},productPerPage = 20) =>{


        let curr_page = parseInt(currentPage)

        let pipeline = PipeLineGenerator.generate_productPage(productPerPage,curr_page);
        
        let product_amount;
        if(Object.keys(Filter).length === 0 )
        {
            product_amount = await productModel.countDocuments()
        }
        else
        {
            let {pagePipeline,filterPipeLine} = PipeLineGenerator.generate_productPageWithFilter(productPerPage,curr_page,Filter)
  
            product_amount = await productModel.aggregate([...filterPipeLine].concat([{'$count':'count'}]))
     
            product_amount = product_amount[0] ?  product_amount[0].count : 0
            pipeline = pagePipeline
        }

        let page_num = product_amount === 0 ? 1 : Math.ceil(product_amount/productPerPage)
        if(curr_page > page_num){
            throw new BadRequestError("This page is not exist")
        }

        try 
        {
            var productData = await productModel.aggregate(pipeline);
        } 
        catch (error) {
            throw new BadRequestError()
        }
        
        

        return {
            "pageinfo":{
                "productNum": product_amount,
                "productPerPage": productPerPage,
                "currentPage": curr_page,
                "pageNum": page_num
            },
            "products": productData
        }

    } 

    static getBestSeller = async(limit_products = 10)=>{
        
        try 
        {
            let pipeLine = PipeLineGenerator.generate_bestSeller(limit_products)
            let bestSeller = await productModel.aggregate(pipeLine)
            
            return {
                bestSeller
            }
        } 
        catch (error) 
        {
            throw new ServerError(error);   
        }

        

    }

    static getNewArrival = async(limit_products = 5) => {

        try 
        {
            let pipeline = PipeLineGenerator.generate_newArrival(limit_products)
            let newArrival = await productModel.aggregate(pipeline)
            return{
                newArrival
            } 
        } 
        catch (error) 
        {
            throw new ServerError();     
        }

        
    }

    static getProductDetail = async(productId) =>{

        let productDetail = await productModel.findOne({
            '_id' : converterHelper.toObjectIdMongo(productId)
        },{
            sold: 0,
            createdAt: 0,
            updatedAt: 0,
            productQuantity:0
        }).lean()

        if(!productDetail) throw new BadRequestError("No product found.")
   

        let similarProducts = await findSimilarProducts(productDetail)

        return {
            productDetail: productDetail,
            similarProducts : similarProducts
        }
    }

    static searchByName = async(searchValue) => {

        let pipeline = PipeLineGenerator.generate_searchByName(searchValue)
        let productsByName = await productModel.aggregate(pipeline)

        return{
            productsByName
        }
    }

    static getAllBrand = async () => {
        let pipeline = PipeLineGenerator.generate_getAllBrand()

        let brandList = await productModel.aggregate(pipeline)

        return{
            brandList
        }
    }

}




module.exports = ProductService