const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const sellerDeliverySchema= new Schema({
    name:{type:String,required:true},//name delivery of 4 hour
    des:{type:String,required:true},//this is delivery of 4 hour
    time:{type:Number,required:true}//1000*60*60*24*4
});


module.exports=mongoose.model('SellerDeliveryTime',sellerDeliverySchema);
