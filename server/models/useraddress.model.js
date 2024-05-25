const {model,Schema,Types} = require("mongoose")

const addressSchema = new Schema({
    addressOwner:{
        type: Schema.Types.ObjectId,
        required:true,
    },
    receiverName:{
        type:String,
        required: true
    },
    receiverPhoneNumber:{
        type:Schema.Types.String,
        required: true
    },
    Nation:{
        type:Schema.Types.String,
        required: true
    },
    City:{
        type:String,
        required: true,
    },
    District:{
        type: String,
        required:true,
    },
    Ward:{
        type: String,
        require: true,
    },
    
    addressDetail:{
        type:String,
        require:true
    },

},
{
    timestamps: true,
})


module.exports = model("UserAddress", addressSchema);