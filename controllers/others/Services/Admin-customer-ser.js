
const CustomerModel=require('../../../models/customer-model');

const AdminCustomerService={

    async findAllcustomer(){

        return await CustomerModel.find().populate('fullAddress').populate('pincodeId').sort({_id:-1});
    },

};


module.exports=AdminCustomerService;
