
const CustomerService=require('../../customer/services/cus-customer-service');


const MangerCustomerController={

    async findCustomers(req,res,next){
        const { manger } = req;//{_id:"101",role:""}mangerId

        try {
            const MyCustomer=await CustomerService.findCustomerForManger({mangerId:manger._id});

            console.log(MyCustomer);

            return res.json({cu:true,MyCustomer});
            

        } catch (error) {
            
            console.log(error);
            return next(error);

        }

    },



};



module.exports=MangerCustomerController;
