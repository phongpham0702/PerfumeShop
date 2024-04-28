const converterHelper = require("../../helpers/converter.helper")
const pipelineGenerator = require("../../helpers/pipeline.generator")
const productModel = require("../product")

const getProductById = async (id) =>{

    let pipeline = [
        {
            '$match':{
                '_id': converterHelper.toObjectIdMongo(id)
            }  
        }
    ].concat(pipelineGenerator.generate_productBasic())
    return await productModel.aggregate(pipeline)
}

const getProductList = async (id_list) =>{

    id_list = id_list.map((id) => {
        return converterHelper.toObjectIdMongo(id)
    })

    let pipeline = [
        {
            '$match':{
                '_id':{$in: id_list}
            }  
        }
    ].concat(pipelineGenerator.generate_productBasic())
    return await productModel.aggregate(pipeline)
}

const checkProductIsExist = async (id) =>{
    let product = await productModel.findOne({"_id": converterHelper.toObjectIdMongo(id)},)
    .select(['productName'])
    .lean()

    if(product) return true

    return false
}

const findSimilarProducts = async(productDetail, limit = 10) => {
    let productID= productDetail['_id']
    let gender = [productDetail["productGender"]];
    let mainScent = productDetail.productScent.mainScent.join("|")

    if(gender[0] !== "Unisex") gender.push("Unisex")
    
    let pipeline = [

        {
            "$match":{
                "_id":{
                    $ne: converterHelper.toObjectIdMongo(productID)
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

        {"$sample":{size : limit}},
        
    ].concat(pipelineGenerator.generate_productBasic())

    let similarProducts = await productModel.aggregate(pipeline);

    return similarProducts;

}



module.exports = {
    getProductById,
    getProductList,
    checkProductIsExist,
    findSimilarProducts
} 




//Use later
/* let firstNotes = product.productScent.firstNotes.join("|")
let middleNotes = product.productScent.middleNotes.join("|")
let finalNotes = product.productScent.finalNotes.join("|") */
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