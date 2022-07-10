const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const APP_URL=process.env.BASE_URL;

const OrderCountSchema=new Schema({
    totalNuOfOrder:{type:Number,required:true},
    totalNuOfOrderCancel:{type:Number,required:true},
    totalNuOfOrderCompleted:{type:Number,required:true},
    totalNuOfOrderPending:{type:Number,required:true},

});


const OrderAmountSchema=new Schema({
    totalAmountOfOrder:{type:Number,required:true},
    totalAmountOfOrderCancel:{type:Number,required:true},
    totalAmountOfOrderCompleted:{type:Number,required:true},
    totalAmountOfOrderPending:{type:Number,required:true},

});


const ExpenseSchema=new Schema({
    totalExpense:{type:Number,required:true},
    ExpenseInDelivery:{type:Number,required:true},
    ExpenseInOthers:{type:Number,required:true},
    ExpenseInRoom:{type:Number,required:true},
    bill:{type:String,required:true,get:(bill)=>{
        return `${APP_URL}/${bill}`;
    }},

});



const mangerAuditSchema= new Schema({

  mangerId:{type:Schema.Types.ObjectId,required:true,ref:"Manger"},
  orderCount:OrderCountSchema,
  orderAmount:OrderAmountSchema,
  Expense:ExpenseSchema,
  totalAmountToGivencompany:{type:Number,required:true},
  remarks:{type:String,required:true},
  bankRecipt:{type:String,required:true,get:(bankRecipt)=>{
      return `${APP_URL}/${bankRecipt}`;
  }},
  finalBill:{type:String,required:true,get:(finalBill)=>{

    return `${APP_URL}/${finalBill}`;
  }},
  status:{type:String,default:"pending"},
  aduitStartDate:{type:String,required:true},//string 2022-04-08
  aduitEndDate:{type:String,required:true},//string  2022-04-30

},{
    timestamps:true,
});

module.exports=mongoose.model('MangerAudit',mangerAuditSchema);

