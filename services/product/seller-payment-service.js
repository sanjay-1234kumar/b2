
const SellerPaymentModel = require('../../models/seller-payment-model');


const SellerPaymentService = {

    async createSellerPaymentFromSeller(data) {

        return await SellerPaymentModel.create(data);
    },
    async findPaymentForEachSeller(filter) {

        return await SellerPaymentModel.find(filter).populate('orderId').sort({_id:-1});


    },

    async findAllPaymentsforMangerwithId(filter) {

        return await SellerPaymentModel.find(filter).populate('sellerId');

    },
    async findPaymentByIdForManger(id) {

        return await SellerPaymentModel.findById(id);

    },
    async findSinglebyidwithDetails(id) {

        return await SellerPaymentModel.findById(id).populate('orderId');

    },
    async findbyiddataforedit(id) {

        return await SellerPaymentModel.findById(id).populate("orderId");
    },
    async findbyidupdatePaymentstatus(id, data) {

        return await SellerPaymentModel.findByIdAndUpdate(id, data);

    },
    async findPaymentofSellerByOrderId(sellerId, orderId) {

        return await SellerPaymentModel.find({ orderId: orderId, sellerId:sellerId }).populate('orderId');
    },
    
};





module.exports = SellerPaymentService;
