
const DeliveryTimeModel = require('../models/seller-delivery-model');

const DeliveryTimeService = {

    async insertTimeDelivery(data) {

        return DeliveryTimeModel.create(data);

    },


};


module.exports = DeliveryTimeService;
