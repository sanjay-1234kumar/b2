const mongoose=require('mongoose');

const APP_URL=process.env.BASE_URL;


const Schema=mongoose.Schema;


const sellerSchema= new Schema({
    phone:{type:String,required:true},
    activated:{type:Boolean,required:false,default:false},
    role:{type:String,default:'seller'},
    name:{type:String,required:false},
    des:{type:String,required:false},
    catergory:{type:String,required:false},
    nameofbussiness:{type:String,required:false},
    gst:{type:String,required:false},
    address1:{type:String,required:false},
    address2:{type:String,required:false},
    fullAddress:{type:Schema.Types.ObjectId,ref:"SellerCitySerAval",required:false},
    shopimage:{type:String,required:false,get:(shopimage)=>{
        return `${APP_URL}/${shopimage}`;
    }},
    mangerId:{type:Schema.Types.ObjectId,required:false,ref:"Manger"},
    pincodeId:{type:Schema.Types.ObjectId,required:false,ref:"SellerPinCode"},
},{
    timestamps:true,
});

module.exports=mongoose.model('Seller',sellerSchema);
