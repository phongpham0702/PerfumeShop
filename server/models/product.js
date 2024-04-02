const mongoose = require("mongoose");

const productSchema = mongoose.Schema({

    PID:{
        type:String,
        unique: true,
        required: true,
    },

    Product_name: String,
    Product_gender:String,
    Product_brand: String,
    Scent:{
        Main:[String],
        First: [String],
        Middle: [String],
        Final: [String],
    },
    seasonRate: {
        Spring: Number,
        Summer: Number, 
        Autumn: Number, 
        Winter: Number, 
    },
    dayNightRate: {
        day: Number, 
        night: Number,
    },
    
    priceScale: [{
        Capacity: String,
        Price: Number,
    }],

    Features:{
        release: String,
        suitable_age: String,
        fragrant_saving: String,
    },

    Sold:{
        type:Number,
        default: 0,
        min: 0
    },
    
    Pictures: String,
    Description: String,
    lastUpdated:{
        type:Date,
        default: new Date(Date.now())
    },
    
})

productSchema.pre('save', function(next) {
    
    this.lastUpdated = new Date(Date.now())
    next();
});

module.exports = mongoose.model("Product",productSchema);