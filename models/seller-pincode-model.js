

const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const pincodeSchema= new Schema({
    name:{type:String,required:true},
    des:{type:String,required:true},
    totalP:{type:Number,required:true},
    pincode:{type:Number,required:true,unique:true},//pincode bhi single create hoga yage
    status:{type:Boolean,required:false,default:true},
    
});

module.exports=mongoose.model('SellerPinCode',pincodeSchema);