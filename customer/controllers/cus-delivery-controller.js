
const CustomerDeliveryService=require('../services/cus-delivery-service');

const DELIVERYTIMEID=process.env.DELIVERYTIMEID;

const CustomerDeliveryController={


    async findSingleDeliverTime(req,res,next){

        //console.log("route call get delivery time ");

        try {

            const result=await CustomerDeliveryService.findDeliverTimeByid(DELIVERYTIMEID);

            //console.log(result);

            return res.json({or:true,result});
            
        } catch (error) {
            
            //console.log(error);
            
            return next(error);

        }

    },

};



module.exports=CustomerDeliveryController;
