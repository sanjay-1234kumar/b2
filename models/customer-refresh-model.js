const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const customerRefreshSchema= new Schema({
   
    token:{type:String,required:true},
    customerId:{type:Schema.Types.ObjectId,required:true,ref:"Customer"},
    
});

module.exports=mongoose.model('CustomerRefresh',customerRefreshSchema);


