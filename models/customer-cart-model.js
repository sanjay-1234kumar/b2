const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const customerCartSchema= new Schema({
 customerId:{type:Schema.Types.ObjectId,required:true,ref:"Customer"},
  productId:{type:Schema.Types.ObjectId,required:true,ref:"Product"},
  name:{type:String,required:true},
  productImage:{type:String,required:true},
  baseprice:{type:Number,required:true},
  basedelivery:{type:Number,required:true},
  quantity:{type:Number,required:true},
  totalamount:{type:Number,required:true},
  totaldelivery:{type:Number,required:true},

},{
    timestamps:true,
});

module.exports=mongoose.model('CustomerCart',customerCartSchema);