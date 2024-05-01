const {model,Schema} = require("mongoose")

const cartSchema = new Schema({
    userID:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Users',
        unique: true
    },
    
    cartProduct:{
        type:Array,
        required:true,
        default:[]
    },
    /*
        {
            productId,
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


cartSchema.pre('save', (next) => {
    this.cartCountProduct = this.cartProduct.length
    next();
})

module.exports = model("Carts", cartSchema);