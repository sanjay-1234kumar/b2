
const SellerDeliverTimeModel=require('../../models/seller-delivery-model');

const CustomerDeliveryService={

    async findDeliverTimeByid(id){

        return await SellerDeliverTimeModel.findById(id);

    },


};


module.exports=CustomerDeliveryService;
