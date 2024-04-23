const productModel = require('../models/product')
const PipeLineGenerator = require('../helpers/pipeline.generator')
const {BadRequestError, ServerError} = require('../helpers/error.response')
const {Types} = require('mongoose')
class ProductService
{

    static checkProduct = async(productID) => {
        let product = await productModel.findOne({'_id':new Types.ObjectId(productID)}).select(["_id"]).lean()

        if(!product)
        {
            return false
        }
        else{
            return true
        } 
    }

    static getProducts = async (currentPage = 1, Filter = {},productPerPage = 20) =>{


        let curr_page = parseInt(currentPage)

        let pipeline = PipeLineGenerator.generate_productPage(productPerPage,curr_page);
        
        let product_amount;
        if(Object.keys(Filter).length === 0 )
        {
            product_amount = await productModel.countDocuments()
        }
        else
        {
            let {pagePipeline,filterPipeLine} = PipeLineGenerator.generate_productPageFilter(productPerPage,curr_page,Filter)
  
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
                "product_num": product_amount,
                "productPerPage": productPerPage,
                "currentPage": curr_page,
                "Page_nums": page_num
            },
            "products": productData
        }

    } 

    static bestSeller = async()=>{
        
        try 
        {
            const limit_products = 10;
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

    static newArrival = async() => {

        try 
        {
        const limit_products = 5;
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

    static productDetail = async(pid) =>{

        let pipeline = [
            {
                $match : {'_id': new Types.ObjectId(pid)}
            },
                                
        ].concat(PipeLineGenerator.generate_productDetail()) 

        let product_detail = await productModel.aggregate(pipeline)
        
        if(!product_detail[0])
        {
            throw new BadRequestError("No product found.")
        }

        let similar_products = await this.__findSimular__(product_detail[0])

        return {
            product_detail: product_detail[0],
            similar_products
        }
    }

    static __findSimular__ = async(product) => {

        try 
        {
            const num_of_products = 10;
            let current_product_id = product['_id']
            let gender = [product["productGender"]];
            let mainScent = product.productScent.mainScent.join("|")
            let firstNotes = product.productScent.firstNotes.join("|")
            let middleNotes = product.productScent.middleNotes.join("|")
            let finalNotes = product.productScent.finalNotes.join("|")
            
            if(gender[0] !== "Unisex")
            {
                gender.push("Unisex")
            }

            let pipeLine = [

                {
                    "$match":{
                        "_id":{
                            $ne: new Types.ObjectId(current_product_id)
                        },
                        "productGender":{
                            $in: gender
                        },
                        "productScent.mainScent":{
                        $regex: mainScent,
                        $options: "i",
                        },
                    }
                },

                // {
                //     "$match":{
                //             "Scent.First": {
                //               $regex: first_scent,
                //               $options: "i",
                //             },
                //             "Scent.Middle": {
                //               $regex: middle_scent,
                //               $options: "i",
                //             },
                //               "Scent.Final": {
                //               $regex: final_scent,
                //               $options: "i",
                //             },   
                //     }
                // },
                {"$sample":{size : num_of_products}},
                
                
            ].concat(PipeLineGenerator.generate_productBasic())

            let similarProducts = await productModel.aggregate(pipeLine);

            return similarProducts;

        } 
        catch (error) 
        {
            throw new ServerError(error)
        }
        
    } 

    static searchByName = async(searchValue) => {

        let pipeline = PipeLineGenerator.generate_searchByName(searchValue)
        let productsByName = await productModel.aggregate(pipeline)

        return{
            productsByName
        }
    }


    static getProductNameById = async(productID) => {
        let productName = await productModel.findOne({'_id':new Types.ObjectId(productID)}).select(["productName"]).lean()

        return productName['productName']
    }
    
    static getProductsById = async (id_list) => {
        let items = {}
        let item_amount = id_list.length

        if(id_list.length === 0 ) return {wish_list_num,items}

        let pipeLine = PipeLineGenerator.generate_findProductById(id_list)
        
        items = await productModel.aggregate(pipeLine);

        return {
            item_amount,
            items
        }
    }

}




module.exports = ProductService