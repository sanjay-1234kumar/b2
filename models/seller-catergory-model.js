const mongoose=require('mongoose');

const APP_URL=process.env.BASE_URL;

const Schema=mongoose.Schema;

const catergorySchema= new Schema({
    name:{type:String,required:true,unique:true},//name unique honachayie
    des:{type:String,required:true},
    status:{type:Boolean,required:false,default:true},
    catergoryimage:{type:String,required:true,get:(catergoryimage)=>{
        return`${APP_URL}/${catergoryimage}`;
    }},
},{
    timestamps:true,

});

module.exports=mongoose.model('Catergory',catergorySchema);
