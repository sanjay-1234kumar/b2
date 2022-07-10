const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const sanjaySchema= new Schema({
 
    name:{type:String,required:true},
    price:{type:Number,required:true},
    brand:{type:String,required:true},
    rating:{type:Number,required:true},


});

module.exports=mongoose.model('SanjayTest',sanjaySchema);