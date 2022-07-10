const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const mangerRefreshSchema= new Schema({
   
    token:{type:String,required:true},
    mangerId:{type:Schema.Types.ObjectId,required:true,ref:"Manger"},
    
});

module.exports=mongoose.model('MangerRefresh',mangerRefreshSchema);