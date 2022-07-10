
const SellerCitySerAvalService=require('../../services/serAvailble-service');


const MangerAddressController={


    async findAddressMangerForForm(req,res,next){

        console.log("route call manger address form");

        try {
            const result=await SellerCitySerAvalService.findAddressforCustomer();

            console.log(result);
            return res.json({or:true,result:result});
        } catch (error) {

            console.log(error);
            return next(error);
            
        }

    },


};


module.exports=MangerAddressController;
