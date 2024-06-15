const {model,Schema,Types} = require("mongoose")

const productSchema = new Schema({

    productName:{
        type: String,
        required: true
    },
    productBrand:{
        type: String,
        required: true,
    },
    productGender:{
        type:String,
        enum:["Male","Female","Unisex"]
    },
    productScent:{
        mainScent:[String],
        firstNotes: [String],
        middleNotes: [String],
        finalNotes: [String],
    },
    priceScale: [{
        capacity: String,
        price: Number,
        inStock:{
            type:Number,
            default:0,
            min:0
        }
    }],
    productFeatures:{
        release: String,
        suitableAge: String,
        savingTime: String
    },
    seasonRate: {
        Spring: Number,
        Summer: Number, 
        Autumn: Number, 
        Winter: Number, 
    },
    dayNightRate: {
        day: Number, 
        night: Number,
    },
    
    sold:{
        type:Number,
        default: 0,
        min: 0
    },
    productThumbnail:{
        type:String,
        required:true
    },
    productDescription: String

},
{
    timestamps: true,
}

)

module.exports = model("Products", productSchema);