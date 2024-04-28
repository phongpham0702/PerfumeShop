const {model,Schema,Types} = require("mongoose")

const keyTokenSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Users',
        unique: true
    },
    
    publicKey:{ 
        type:String, 
        required: true
    },
    privateKey:{ 
        type:String, 
        required: true
    },

    refreshToken:{
        type: String,
        required: true
    },

    refreshTokenUsed:{
        type: Schema.Types.Array,
        default: []
    },

},
{
    timestamps: true
}

)


module.exports = model("Keys", keyTokenSchema);