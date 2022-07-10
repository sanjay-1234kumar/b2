
const CustomerRefreshModel=require('../../models/customer-refresh-model');


const CustomerRefreshService={

async createCustomerWithRefresh(data){

    return await CustomerRefreshModel.create(data);
},

async findRefreshTokenForCustomer(customerId,token){

    return await CustomerRefreshModel.findOne({customerId,token});


},

async updateCustomerRefreshToken(customerId,oldtoken,ntoken){

    return await CustomerRefreshModel.findOneAndUpdate({customerId:customerId,token:oldtoken},{token:ntoken});
    
},

async deleteRefreshTokenofCustomer(customerId,token){

    return await CustomerRefreshModel.deleteOne({customerId,token});// perfect 
    
},


};


module.exports=CustomerRefreshService;
