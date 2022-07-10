
const SellerCityService=require('../../services/serAvailble-service');

const CustomerAddressController={

  async  findAdressForCsutomer(req,res,next){

    //console.log("customer address route");

    try {
        const result=await SellerCityService.findAddressforCustomer();

        //console.log(result);
        
        return res.json({or:true,result});
        
    } catch (error) {
        //console.log(error);
        return next(error);
        
        
        
    }

 

    },



};


module.exports=CustomerAddressController;
