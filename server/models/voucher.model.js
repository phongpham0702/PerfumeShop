const {model,Schema} = require("mongoose");

const voucherSchema = new Schema({
    voucherCode:{
        type: Schema.Types.String,
        required: true,
        unique: true
    },

    voucherTitle:{
        type: Schema.Types.String,
        required: true,
    },

    voucherType:{
        type:Schema.Types.String,
        required: true,
        enum:['discount_percent', 'discount_amount']
    },

    voucherDiscount:{
        type: Schema.Types.Number,
        required: true
    },

    voucherExp:{
            type: Schema.Types.Date,
            required: true
    },


    /* Voucher conditions */

    quantityLimit:{
        type:Schema.Types.Number,
        min: 0,
        max: 99999
    },

    minPriceTotal:{
        type: Schema.Types.Number,
        min: 0,
        default: 0
    },

    maxDiscountTotal:{
        type: Schema.Types.Number,
        min: 0
    },

    usageTarget:{
        type: Schema.Types.String,
        default: "all",
        enum: ["all","system_users"]
    },

    /* Voucher conditions */

},
{   
    timestamps: true,
})

voucherSchema.index( { "voucherExp": 1 }, { expireAfterSeconds: 0 } )

module.exports = model("Vouchers", voucherSchema);

/* "voucherCode":"TESTCODE10",
"voucherTitle": "Discount 10% - Max 10$",
"voucherType": "discount_percent",
"voucherDiscount": 0.1,
"voucherExp": { "$date": "2024-05-30T12:15:00Z" } */

//   "voucherCode": "TESTCODE50",
//   "voucherTitle": "Discount 50% - Max 100$",
//   "voucherType": "discount_percent",
//   "voucherDiscount": 0.5,
//   "voucherExp": {
//     "$date": "2024-08-30T12:15:00.000Z"
//   },
// 	"quantityLimit": 100,
// 	"minPriceTOtal": 200,
// 	"maxDiscountTotal": 100,
// 	"usageTarget":"system_users"