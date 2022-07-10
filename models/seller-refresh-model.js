const mongoose=require('mongoose');



const Schema=mongoose.Schema;

const sellerRefreshSchema= new Schema({
    token:{type:String,required:true},
    sellerId:{type:Schema.Types.ObjectId,ref:'Seller'}
  
},{
    timestamps:true,
});

module.exports=mongoose.model('SellerRefresh',sellerRefreshSchema);
