const {model,Schema,Types} = require("mongoose")

const userSchema = new Schema({
    Email:{
        type: String,
        required:true,
        unique: true,
        trim: true,
        maxLength: 200
    },
    Password:{
        type:String,
        required: true,
    },
    FullName:{
        type: String,
        required:true,
        trim: true,
        maxLength: 200
    },
    DoB:{
        type: Date,
        require: true,
        get:(v) => {
            
            return v.toLocaleDateString()
        }
    },
    
    PhoneNumber:{
        type:String,
        unique: true,
        require:true
    },

    WishList:{
        type:[String],
        default:[]
    },

    Addresses:{
        type: [{

            type: Schema.Types.ObjectId,
            required: true,
            ref:'UserAddress'
            
        }],
        default: [],
    },

    defaultAddress:{
        type: Schema.Types.String,
        default:""
    }
},
{
    timestamps: true,
})


userSchema.index({
    'Email': 1
})



module.exports = model("Users", userSchema);