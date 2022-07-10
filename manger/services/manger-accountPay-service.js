
const MangerAccountPayModel=require('../../models/manger-accountPay-model');

const MangerAccountPayService={


    async createAccountPayment(data){

        return await MangerAccountPayModel.create(data);
        

    },
    async findAllAccountpaybymangerid(filter){

        return await MangerAccountPayModel.find(filter);

    },



};



module.exports=MangerAccountPayService;
