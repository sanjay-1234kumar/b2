
const MangerOrderService=require('../../customer/services/cus-order-service');

const MangerOrderController={


    async getAllMangerOrders(req,res,next){

        const{manger}=req;//{_id:"",role:"",actoivated}

        try {

            const Orders=await MangerOrderService.findAllOrdersForManger({mangerId:manger._id});

            console.log(Orders);
            return res.json({or:true,Orders});

        } catch (error) {
            
            console.log(error);
            return next(error);

        }

    },



};




module.exports=MangerOrderController;







