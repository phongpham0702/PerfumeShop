const productModel = require('../models/product')
const PipeLineGenerator = require('../helpers/pipeline.generator')
const {BadRequestError, ServerError} = require('../helpers/error.response')
class ProductService
{

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
    
    let page_num = Math.ceil(product_amount/productPerPage)
    if(curr_page > page_num){
        throw new BadRequestError()
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
            $match : {'PID': pid}
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
        let current_product_id = product.PID
        let gender = [product["Product_gender"]];
        let main_scent = product.Scent.Main.join("|")
        let first_scent = product.Scent.First.join("|")
        let middle_scent = product.Scent.Middle.join("|")
        let final_scent = product.Scent.Final.join("|")
        
        if(gender[0] !== "Unisex")
        {
            gender.push("Unisex")
        }

        let pipeLine = [

            {
                "$match":{
                    "PID":{
                        $ne: current_product_id
                    },
                    "Product_gender":{
                        $in: gender
                    },
                    "Scent.Main":{
                    $regex: main_scent,
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

}




module.exports = ProductService