const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const APP_URL=process.env.BASE_URL;


const mangerAccountPay= new Schema({

  mangerId:{type:Schema.Types.ObjectId,required:true,ref:"Manger"},
  amountOfSeller:{type:Number,required:true},
  amountOfCustomer:{type:Number,required:true},
  paymentId:{type:Schema.Types.ObjectId,required:true,ref:"SellerPayment"},
  orderId:{type:Schema.Types.ObjectId,required:true,ref:"CustomerOrder"},
  billOfCustomer:{type:String,required:true,get:(billOfCustomer)=>{ 
    return `${APP_URL}/${billOfCustomer}`;
  }},
  billOfSeller:{type:String,required:true,get:(billOfSeller)=>{ 
    return `${APP_URL}/${billOfSeller}`;
  }},
  status:{type:String,default:'not accepted',required:false},
},{
    timestamps:true,
});

module.exports=mongoose.model('MangerAccountPayment',mangerAccountPay);

