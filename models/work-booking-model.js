const mongoose = require('mongoose');

const CLIENT_URL = process.env.CLIENT_URL;

const Schema = mongoose.Schema;

const workbookingSchema = new Schema({

    customerId: { type: Schema.Types.ObjectId, required: true, ref: "Customer" },
    name: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    pincodeId: { type: Schema.Types.ObjectId, required: true, ref: "SellerPinCode" },//refreence of pincode table
    fullAddress: { type: Schema.Types.ObjectId, required: true, ref: "SellerCitySerAval" },
    workname: { type: String, required: true },
    workimage: {
        type: String, required: false, get: (workimage) => {
            return `${CLIENT_URL}/${workimage}`;
        }
    },
    bookingStatus: { type: String, default:"pending" },

}, {
    timestamps: true,
    
});



module.exports = mongoose.model('WorkBooking', workbookingSchema);