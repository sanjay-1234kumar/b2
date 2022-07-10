const mongoose=require('mongoose');



const Schema=mongoose.Schema;

const sellerPaymentSchema= new Schema({
    sellerId:{type:Schema.Types.ObjectId,ref:'Seller',required:true},
    name:{type:String,required:true},
    paymentStatus:{type:String,default:'pending'},//sir payment status update hoga
    amount:{type:Number,required:true},//amount
    amountofbill:{type:Number,required:true},
    sellerName:{type:String,required:true},//manger name 
    mangerId:{type:Schema.Types.ObjectId,required:true,ref:"Manger"},// mangerId,
    orderId:{type:Schema.Types.ObjectId,required:true,ref:"CustomerOrder"},
},{
    timestamps:true,
});


module.exports=mongoose.model('SellerPayment',sellerPaymentSchema);
