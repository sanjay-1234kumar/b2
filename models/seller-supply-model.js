
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const supplySchema = new Schema({

    status: { type: Boolean, required: false, default: true },//yes active or dectived
    sellerId: { type: Schema.Types.ObjectId, required: true, ref: 'Seller' },
    productId: { type: Schema.Types.ObjectId, required: true, ref: 'Product' },
    price: { type: Number, required: true },// with gst 
    inStock: { type: Number, required: true },
    mangerId: { type: Schema.Types.ObjectId, required: true, ref: "Manger" },

}, {
    timestamps: true,


});

module.exports = mongoose.model('Supply', supplySchema);
