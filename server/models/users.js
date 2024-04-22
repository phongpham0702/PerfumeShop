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
    Cart:{
        type:[String],
        default:[]
    },

    WishList:{
        type:[String],
        default:[]
    },

    LastSearch:{
        type: String,
        default: ""
    },

    CreatedAt:{
        type: Date,
        default: new Date(Date.now()),
        immutable: true,
    },

    LastUpdated:{
        type: Date,
        default: new Date(Date.now()),
    },

    isVerify:{
        type:Boolean,
        default:false,
    },

    isAdmin:{
        type:Boolean,
        default:false,
    }

})

// Define pre-save middleware to update lastUpdate
userSchema.pre('save', function(next) {
    this.lastUpdate = new Date(Date.now());
    next();
});

module.exports = model("Users", userSchema);