const mongoose = require('mongoose');



const Schema = mongoose.Schema;

const sellerAlertSchema = new Schema({
    sellerId: { type: Schema.Types.ObjectId, required: true,ref:"Seller" },
    productId: { type: Schema.Types.ObjectId, required: true,ref:"Product" },
    supplyId: { type: Schema.Types.ObjectId, required: true,ref:"Supply" },
    status:{type:String,required:false,default:"not seen"},
}, {
    timestamps: true,

    
});




module.exports = mongoose.model('SellerAlert', sellerAlertSchema);
