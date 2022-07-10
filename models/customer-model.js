const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const customerSchema= new Schema({
    phone:{type:String,required:true},
    role:{type:String,default:'customer'},
    activated:{type:Boolean,required:false,default:false},//for address
    name:{type:String,required:false},
    address1:{type:String,required:false},
    address2:{type:String,required:false},
    fullAddress:{type:Schema.Types.ObjectId,ref:"SellerCitySerAval",required:false},
    mangerId:{type:Schema.Types.ObjectId,required:false,ref:"Manger"},//mangerId
    pincodeId:{type:Schema.Types.ObjectId,required:false,ref:"SellerPinCode"},//pincodeId
    
},{
    timestamps:true,
});

module.exports=mongoose.model('Customer',customerSchema);

