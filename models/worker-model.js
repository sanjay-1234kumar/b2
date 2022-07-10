const mongoose = require('mongoose');

const APP_URL = process.env.BASE_URL;

const Schema = mongoose.Schema;


const workSchema = new Schema({
    phone: { type: String, required: true },
    name: { type: String, required: false },
    address: { type: String, required: false },
    mangerId: { type: Schema.Types.ObjectId, required: true, ref: "Manger" },//admin seller ke copy
    pincodeId: { type: Schema.Types.ObjectId, required: true, ref: "SellerPinCode" },
    fullAddress: { type: Schema.Types.ObjectId, ref: "SellerCitySerAval", required: true },
    adarNo: { type: String, required: true },
    age: { type: Number, required: true },
    bankNo: { type: Number, required: true },
    work: { type: String, required: true, },
    isAvaible: { type: String, required: false, default: "Avaible" },
    primage: {
        type: String, required: false, get: (primage) => {
            return `${APP_URL}/${primage}`;
        }
    },
    status: { type: Boolean, required: false, default: true },

}, {
    timestamps: true,
});


workSchema.index({ work: "text" });


module.exports = mongoose.model('Worker', workSchema);


