

const SellerModel = require('../../../models/seller-model');

const AdminSellerService = {


    async findAllSeller() {

        return await SellerModel.find().populate('fullAddress').populate('pincodeId').sort({ _id: -1 });

    },

};



module.exports = AdminSellerService;