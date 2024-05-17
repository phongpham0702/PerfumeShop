const {model,Schema} = require("mongoose");

const cartSchema = new Schema({
    userID:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Users',
        unique: true
    },
    
    cartProduct:{
        type:[{
            productId:{
                type: Schema.Types.ObjectId,
                required: true,
                ref:'Products'
            },
            modelId:{
                type: Schema.Types.ObjectId,
                required: true,
            },
            quantity:{
                type: Number,
                default: 1
            }
        },{_id:false}],
        required:true,
        default:[]
    },
    
    cartCountProduct:{
        type:Number,
        default:0
    },

},
{   
    timestamps: true,
}

)

module.exports = model("Carts", cartSchema);