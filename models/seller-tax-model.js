const mongoose=require('mongoose');


const Schema=mongoose.Schema;

const taxSchema= new Schema({
    name:{type:String,required:true,unique:true},//lower case 
    des:{type:String,required:true},//lower case 
    status:{type:Boolean,required:false,default:true},
   rate:{type:Number,required:true,unique:true},
   
},{
    timestamps:true,
});

module.exports=mongoose.model('Tax',taxSchema);

