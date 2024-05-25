const {model,Schema} = require("mongoose");

const voucherSchema = new Schema({
    voucherCode:{
        type: Schema.Types.String,
        required: true,
        unique: true
    },

    voucherType:{
        type:Schema.Types.String,
        required: true,
        enum:['individual', 'general']
    },

    discountType:{
        type: Schema.Types.String,
        required: true,
        enum:['percent','amount']
    },

    voucherDiscount:{
        type: Schema.Types.Number,
        required: true
    },
    whiteList:{
        type:[String],
        default: []
    },
    blackList:{
        type:[String],
        default: []
    },

    voucherAmount:{
        type:Schema.Types.Number,
        default: 99999, // 99999 -> no limit until expired
        min: 0,
        max: 99999
    },

    voucherExp:{
        type: Schema.Types.Date,
        required: true
    }

},
{   
    timestamps: true,
})

module.exports = model("Vouchers", voucherSchema);