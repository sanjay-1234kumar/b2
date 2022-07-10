const mongoose=require('mongoose');

const Schema=mongoose.Schema;
const APP_URL=process.env.BASE_URL;


const mangerSchema= new Schema({
    phone:{type:String,required:true},
    role:{type:String,default:'manger'},
    activated:{type:Boolean,required:false,default:false},//for address
    name:{type:String,required:false},
    address:{type:String,required:false},
    imageOfBranch:{type:String,required:false,get:(imageOfBranch)=>{
       return `${APP_URL}/${imageOfBranch}`;
    }},
    fullAddress:{type:Schema.Types.ObjectId,required:false,ref:"SellerCitySerAval"},
    des:{type:String,required:false},
    pincodeId:{type:Schema.Types.ObjectId,required:false,ref:"SellerPinCode"}, // message unique
},{
    timestamps:true,
});

module.exports=mongoose.model('Manger',mangerSchema);