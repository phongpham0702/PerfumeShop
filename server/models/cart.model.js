const {model,Schema} = require("mongoose")

const cartSchema = new Schema({
    userID:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    },

    cartState:{
        type:String,
        required:true,
        enum:["active","completed","failed","pending"],
        default: 'active'
    },

    cartProduct:{
        type:Array,
        required:true,
        default:[]
    },
    /*
        {
            productID,
            brand,
            productName,
            capacity
            price,
            quantity
        }
    */


    cartCountProduct:{
        type:Number,
        default:0
    },

},
{
    timestamps: true
}

)

module.exports = model("Carts", cartSchema);