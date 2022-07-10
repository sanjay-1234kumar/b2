
const AdminCustomerService=require('./Services/Admin-customer-ser');

const AdminCustomerController={

    async findAllCustomerListforAdmin(req,res,next){

        try {

            const result=await AdminCustomerService.findAllcustomer();

            //console.log(result);

            return res.json({or:true,result});
            
        } catch (error) {
            
            //console.log(error);
            return next(error);
        }
    },

};


module.exports=AdminCustomerController;