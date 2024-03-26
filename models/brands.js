const mongoose = require("mongoose")

const brandSchema = mongoose.Schema({

    BID:{
        type: String,
        unique: [true, "This brand ID is already exists"],
        required: [true, "Missing brand ID"],
    },

    Name:{
        type: String,
        unique: [true, "This brand name is already exists"],
        required: [true, "Missing brand name"],
    },

    Products_num:{
        type: Number,
        default: 0o0,
        min: 0o0
    },

    Products_list:[String],
})

// Define pre-save middleware to update Products_num
brandSchema.pre('save', function(next) {
    // Update Products_num based on the length of Products_list array
    this.Products_num = this.Products_list.length;
    next();
});

module.exports = mongoose.model("Brands", brandSchema);