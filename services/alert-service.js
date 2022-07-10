
const SellerAlertModel = require('../models/seller-alert-model');



const SellerAlertService = {


    async allAlert() {

        return await SellerAlertModel.find().populate('sellerId').sort({_id:-1});
        


    },
    async findSingleAlert(id) {

        return await SellerAlertModel.findById(id).populate("supplyId").populate("productId").populate('sellerId');

    },
    async getDataforeditofAlert(id){

        return await SellerAlertModel.findById(id).populate("supplyId").populate("productId").populate('sellerId');

    },
    async updateAlertbyid(id,data){

        return await SellerAlertModel.findByIdAndUpdate(id,data);
    },
    async createSingleAlertfromMap(data){

        return await SellerAlertModel.create(data);
        
    },

};





module.exports = SellerAlertService;
