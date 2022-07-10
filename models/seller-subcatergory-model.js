const mongoose=require('mongoose');

const APP_URL=process.env.BASE_URL;
const Schema=mongoose.Schema;
const subcatergorySchema= new Schema({
    name:{type:String,required:true,unique:true},
    des:{type:String,required:true},
    status:{type:Boolean,required:false,default:true},
    parent:{type:Schema.Types.ObjectId,ref:'Catergory'},
    subcatergoryimage:{type:String,required:false,get:(subcatergoryimage)=>{
        return`${APP_URL}/${subcatergoryimage}`;
    }},
},{
    timestamps:true,
});

module.exports=mongoose.model('SubCatergory',subcatergorySchema);
