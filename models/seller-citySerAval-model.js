
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sellerCitySerAvalSchema = new Schema({
    nameOfCity: { type: String, required: true },
    stateOfCity: { type: String, required: true },
    countryOfCity: { type: String, required: true },
    tierType: { type: String, required: true },
    pincodeOfCity: { type: Schema.Types.ObjectId, required: true, ref: "SellerPinCode" ,unique:true},
}, {
    timestamps: true,
});

module.exports = mongoose.model('SellerCitySerAval', sellerCitySerAvalSchema);
