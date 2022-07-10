
const OrderModel=require('../../../models/customer-order-model');

const AdminOrderService={

    async findAllOrders(){

        return await OrderModel.find().populate('customerId').populate('fullAddress').populate('pincodeId').sort({_id:-1});

    },

    async findOrderById(id){

        return await OrderModel.findById(id).populate('customerId').populate('fullAddress').populate('pincodeId');

    },
    async getDataforeditByid(id){

        return await OrderModel.findById(id).populate('fullAddress').populate('pincodeId');
    },
    async findByidAndupdateOrderStatus(id,data){

        return await OrderModel.findByIdAndUpdate(id,data);

    },

};


module.exports=AdminOrderService;