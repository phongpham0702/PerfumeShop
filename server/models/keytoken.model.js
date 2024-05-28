const {model,Schema,Types} = require("mongoose")

const keyTokenSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Users',
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

    activeAccessToken:{
        type: String,
        required: true
    },

    expireAt:{
        type: Date,
        required: true
    }

},
{
    timestamps: true
}

)

//Auto delete docs
keyTokenSchema.index( { "expireAt": 1 }, { expireAfterSeconds: 0 } )

module.exports = model("Keys", keyTokenSchema);