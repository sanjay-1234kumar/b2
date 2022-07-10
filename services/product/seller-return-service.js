
const SellerReturnModel = require('../../models/seller-return-model');


const SellerReturnService = {

    async createSingleReturnFromSeller(data) {

        return await SellerReturnModel.create(data);
    },

    async findAllReturnFromSellerById(filter) {


        return await SellerReturnModel.find(filter).populate('orderId').sort({_id:-1});//sellerId:""

    },
    async createReturnfromManger(data) {

        return await SellerReturnModel.create(data);

    },
    async findAllReturnsofMangerById(filter) {

        return await SellerReturnModel.find(filter);

    },
    async findsingleretunrbyidwithdetials(id) {

        return await SellerReturnModel.findById(id).populate('orderId');
    },
    async findbyidforedit(id) {

        return await SellerReturnModel.findById(id).populate('orderId');

    },
    async updatereturnbyid(id, data) {

        return await SellerReturnModel.findByIdAndUpdate(id, data);

    },

};






module.exports = SellerReturnService;
