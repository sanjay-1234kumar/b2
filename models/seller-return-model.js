const mongoose=require('mongoose');

const APP_URL=process.env.BASE_URL;


const Schema=mongoose.Schema;


const returnSellerSchema= new Schema({
    name:{type:String,required:true},
    amount:{type:Number,required:true},
  sellerId:{type:Schema.Types.ObjectId,ref:"Seller",required:true},
  retStatus:{type:String,required:false,default:"notseen"},//seen //accepted
    retImage:{type:String,required:true,get:(retImage)=>{
        return `${APP_URL}/${retImage}`;
    }},
    billImage:{type:String,required:true,get:(billImage)=>{
        return `${APP_URL}/${billImage}`;
    }},
    orderId:{type:Schema.Types.ObjectId,ref:"CustomerOrder",required:true},

},{
    timestamps:true,
});

module.exports=mongoose.model('SellerReturn',returnSellerSchema);
