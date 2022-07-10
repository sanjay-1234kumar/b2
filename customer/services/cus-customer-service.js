
const CustomerModel = require('../../models/customer-model');


const CustomerService = {

    async findCustomer(filter) {


        return await CustomerModel.findOne(filter);//{phone:"+9131"}

    },
    async getUserProfilewithdetailsbyid(id){

        return await CustomerModel.findById(id).populate('fullAddress').populate('pincodeId');

    },

    async createCustomer(data) {

        return await CustomerModel.create(data);

    },
    async updateCustomerProfile(filter, data) {

        return await CustomerModel.findOneAndUpdate(filter, data);//{activated:true}

    },

    async findCustomerForManger(filter) {

        return await CustomerModel.find(filter);

    },
    async findCustomerById(id) {


        return await CustomerModel.findById(id);

    },
    async findCustomerByIdAndUpdateProfile(id, data) {

        return await CustomerModel.findByIdAndUpdate(id, data);

    },
    async findCustomerByIdWithDetails(id) {

        return await CustomerModel.findById(id).populate('fullAddress').populate('pincodeId');

    },


};



module.exports = CustomerService;
