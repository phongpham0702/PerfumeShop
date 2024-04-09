const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    Email:{
            type:String,
            required:true,
            unique: true,
    },
    Password:{
        type:String,
        required: [true, "Missing password"],
    },
    FullName:{
        type: String,
    },
    DoB:{
        type: Date,
    },
    
    PhoneNumber:{
        type:String,
        unique: true,
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

    IsAdmin:{
        type:Boolean,
        default:false,
        select: false
    }

})

// Define pre-save middleware to update lastUpdate
userSchema.pre('save', function(next) {
    this.lastUpdate = new Date(Date.now());
    next();
});

module.exports = mongoose.model("Users", userSchema);