const {model,Schema,Types} = require("mongoose")

const keyTokenSchema = new Schema({
    User:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    },
    publicKey:{ 
        type:String, 
        required: true
    },
    privateKey:{ 
        type:String, 
        required: true
    },

    refreshTokenUsed:{
        type: Schema.Types.Array,
        default: []
    },
    refreshToken:{
        type: String,
        require: true
    },

},
{
    timestamps: true
}

)

module.exports = model("Keys", keyTokenSchema);