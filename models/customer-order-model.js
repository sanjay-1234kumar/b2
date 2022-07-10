const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const orderItemsSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
  name: { type: String, required: true },
  productImage: { type: String, required: true },
  baseprice: { type: Number, required: true },
  basedelivery: { type: Number, required: true },
  quantity: { type: Number, required: true },
  totalamount: { type: Number, required: true },
  totaldelivery: { type: Number, required: true },
});

//deliveryDate calculated from deliverTimeId table

const customerOrderSchema = new Schema({
  
  customerId: { type: Schema.Types.ObjectId, required: true, ref: "Customer" },
  totalamount: { type: Number, required: true },
  totaldeliverycharge: { type: Number, required: true },
  totalquantity: { type: Number, required: true },
  totalAmountofOrder:{ type: Number, required: true },
  deliverDate: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  pincodeId: { type: Schema.Types.ObjectId, required: true, ref: "SellerPinCode" },//refreence of pincode table
  fullAddress: { type: Schema.Types.ObjectId, required: true, ref: "SellerCitySerAval" },//refrence of
  status: { type: String, default: "placed" },
  paymentType: { type: String, default: "cash on delivery" },
  items: [orderItemsSchema],
  mangerId: { type: Schema.Types.ObjectId, required: true, ref: "Manger" },
 
}, {
  timestamps: true,
});

module.exports = mongoose.model('CustomerOrder', customerOrderSchema);

