

const SellerPinCodeModel = require('../models/seller-pincode-model');


const PinService = {

    async addPincode(data) {

        return await SellerPinCodeModel.create(data);

    },
    async findAllPinforSeller() {

        return await SellerPinCodeModel.find();//admin

    },
    async findSingleForActivate(filter) {

        return await SellerPinCodeModel.findOne(filter);

    },
    async findSinglePincodeByPinSerAvail(filter) {

        return await SellerPinCodeModel.findOne(filter);

    },
    async checkAlreadyExist(pincode) {

        return await SellerPinCodeModel.exists({ pincode });

    },
    async findsinglebyidwithDetails(id) {

        return await SellerPinCodeModel.findById(id);
    },
    async getDataforeditofPincode(id) {

        return await SellerPinCodeModel.findById(id);


    },
    async updateSellerPinbyid(id, data) {

        return await SellerPinCodeModel.findByIdAndUpdate(id, data);

    },

};



module.exports = PinService;
