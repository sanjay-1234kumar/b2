
const mongoose = require('mongoose');

const APP_URL = process.env.BASE_URL;


const Schema = mongoose.Schema;

const imageSchema = new Schema({
    alt: { type: String, required: true },
    primage: {
        type: String, required: true, get: (primage) => {
            return `${APP_URL}/${primage}`;
        }
    },
});


const aboutItemSchema = new Schema({
    des: { type: String, required: false },
});

const ProductMapSchema = new Schema({
    mykey: { type: String, required: false },
    myvalue: { type: String, required: false },
});


const productSchema = new Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    status: { type: Boolean, required: false, default: true },
    prImages: [imageSchema],
    mainImage: { type: String, required: true, get: (mainImage) => { return `${APP_URL}/${mainImage}`; } },
    catergory: { type: Schema.Types.ObjectId, required: true, ref: 'SubCatergory' },
    tax: { type: Schema.Types.ObjectId, required: true, ref: 'Tax' },
    des: { type: String, required: true },
    mrp: { type: Number, required: true },
    discount: { type: Number, required: true },
    spExGst: { type: Number, required: true },
    spInGst: { type: Number, required: true },
    sellerId: { type: Schema.Types.ObjectId, required: true, ref: 'Seller' },// auth middlew se 
    parmentSeller: { type: Schema.Types.ObjectId, required: true, ref: 'Seller' },// from req body 
    spExGstForS: { type: Number, required: true },
    spInGstForS: { type: Number, required: true },
    grossProfitForS: { type: Number, required: true },
    netProfitForS: { type: Number, required: true },
    grossProfitMarginForS: { type: Number, required: true },
    netProfitMarginForS: { type: Number, required: true },
    inStock: { type: Number, required: true },
    deliveryCharge: { type: Number, required: false, default: 0 },
    actualDeliveryCharge: { type: Number, required: true },
    deliverTimeId: { type: Schema.Types.ObjectId, ref: 'SellerDeliveryTime', default: '62959c2b299b503dc96f5872' },
    brating: { type: Number, required: false, default: 0 },
    aboutItem: [aboutItemSchema],
    productMap: [ProductMapSchema],
}, {
    timestamps: true,

});


productSchema.index({ name: "text", brand: "text" });//index 


module.exports = mongoose.model('Product', productSchema);

