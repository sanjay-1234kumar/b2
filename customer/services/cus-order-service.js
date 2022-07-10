
const CustomerOrderModel = require('../../models/customer-order-model');


const CustomerOrderService = {

    async createOrder(data) {

        return await CustomerOrderModel.create(data);

    },

    async findAllOrderForCustomer(filter) {

        return await CustomerOrderModel.find(filter).sort({_id:-1});//{cus}

    },


    async findSingleOrderofCustomer(filter) {

        return await CustomerOrderModel.findOne(filter).populate('pincodeId').populate('fullAddress');

    },
    async findAllOrdersForManger(filter) {

        return await CustomerOrderModel.find(filter);

    },
    async findOrderByIdForManger(id) {

        return await CustomerOrderModel.findById(id);

    },
    async findOrderById(id) {

        return await CustomerOrderModel.findById(id);

    },
    async findOrderByIdAndCancelOrder(id, data) {

        return await CustomerOrderModel.findByIdAndUpdate(id, data);

    },

};







module.exports = CustomerOrderService;