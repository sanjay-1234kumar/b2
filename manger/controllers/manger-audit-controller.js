
const MangerAuditService=require('../services/manger-audit-service');


const MangerAuditController = {

    async registerMonthlyAudit(req, res, next) {

        const { manger } = req;//manger

        console.log(req.body);

        // validition 

        let { aduitStartDate, aduitEndDate, totalNuOfOrder, totalNuOfOrderCompleted, totalNuOfOrderCancel, totalNuOfOrderPending } = req.body;//order count

        let { totalAmountOfOrder, totalAmountOfOrderCompleted, totalAmountOfOrderCancel, totalAmountOfOrderPending } = req.body;//order amount

        let { totalExpense, ExpenseInDelivery, ExpenseInRoom, ExpenseInOthers, bill } = req.body;//expenisev

        let { totalAmountToGivencompany, bankRecipt } = req.body;// bank details amount 

        let { remarks, finalBill } = req.body;//photo of final 

        // valditoin of orrder count

        if (!aduitStartDate || !aduitEndDate || !totalNuOfOrder || !totalNuOfOrderCompleted || !totalNuOfOrderCancel || !totalNuOfOrderPending) {
            console.log("validtion of order count ");
            return next({ status: 400, message: "validtion of order count" });
        }

        //valditon of order amount

        if (!totalAmountOfOrder || !totalAmountOfOrderCompleted || !totalAmountOfOrderCancel || !totalAmountOfOrderPending) {
            console.log("valditom of order amount");
            return next({ status: 400, message: "valditom of order amount" });

        }

        // valdition of expesnie

        if (!totalExpense || !ExpenseInDelivery || !ExpenseInRoom || !ExpenseInOthers || !bill) {

            console.log("valditom of expenisve");
            return next({ status: 400, message: "valditom of expense in month " });

        }

        //last valdition 

        if (!totalAmountToGivencompany || !bankRecipt || !remarks || !finalBill) {
            console.log("valditom of adudit accoutn");
            return next({ status: 400, message: "valditom of adudit accoutn" });
        }

        function n(x) {
            return parseInt(x);
        }
        //type casting 
        //order count
        totalNuOfOrder = n(totalNuOfOrder);
        totalNuOfOrderCancel = n(totalNuOfOrderCancel);
        totalNuOfOrderCompleted = n(totalNuOfOrderCompleted);
        totalNuOfOrderPending = n(totalNuOfOrderPending);
        //order amount

        totalAmountOfOrder = n(totalAmountOfOrder);
        totalAmountOfOrderCancel = n(totalAmountOfOrderCancel);
        totalAmountOfOrderCompleted = n(totalAmountOfOrderCompleted);
        totalAmountOfOrderPending = n(totalAmountOfOrderPending);

        //expensve
        totalExpense = n(totalExpense);
        ExpenseInDelivery = n(ExpenseInDelivery);
        ExpenseInOthers = n(ExpenseInOthers);
        ExpenseInRoom = n(ExpenseInRoom);

        //last aduit
        totalAmountToGivencompany=n(totalAmountToGivencompany);
        remarks=remarks.toLowerCase();

        //ok final placed aduit account

      let myData={
        mangerId:manger._id,
        orderCount:{totalNuOfOrder,totalNuOfOrderCancel,totalNuOfOrderCompleted,totalNuOfOrderPending},
        orderAmount:{totalAmountOfOrder,totalAmountOfOrderCancel,totalAmountOfOrderCompleted,totalAmountOfOrderPending},
        Expense:{totalExpense,ExpenseInDelivery,ExpenseInOthers,ExpenseInRoom,bill},
        totalAmountToGivencompany,
        remarks,
        bankRecipt,
        finalBill,
        aduitStartDate,
        aduitEndDate

      };

      try {
          const result=await MangerAuditService.regsiterMangerAudit(myData);

          console.log(result);

          return res.json({or:true,result});

          
      } catch (error) {
          
        console.log(error);
        return next(error);

      }



    },

    async allAuditForManger(req,res,next){

        const{manger}=req;


        try {

            const Result=await MangerAuditService.findAllAduditByMangerId({mangerId:manger._id});
            console.log(Result);
            let audit=Result.map((i)=>{

                return {
                    _id:i._id,
                    mangerId:i.mangerId,
                    orderCount:i.orderCount,
                    orderAmount:i.orderAmount,
                    Expense:i.Expense,
                    totalAmountToGivencompany:i.totalAmountToGivencompany,
                    remarks:i.remarks,
                    bankRecipt:i.bankRecipt,
                    finalBill:i.finalBill,
                    aduitStartDate:i.aduitStartDate,
                    aduitEndDate:i.aduitEndDate,
                    status:i.status,
                    createdAt:i.createdAt

                };

            });

        
            
            return res.json({or:true,audit});

        
        } catch (error) {
            
            console.log(error);
            return next(error);

        }

    },

};





module.exports = MangerAuditController;
