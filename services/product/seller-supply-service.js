

const SellerSupplyModel = require('../../models/seller-supply-model');

const SellerSupplyService = {

    async createSingleSupplyMapForSeller(data) {

        return await SellerSupplyModel.create(data);

    },
    async findProdutcAlreadyExist(filter){

        return await SellerSupplyModel.findOne(filter);
    },
    async findSupplyMapForSeller(data) {

        return await SellerSupplyModel.find(data).populate('productId').sort({_id:-1});

    },

    async findMapbyid(id){
        return await SellerSupplyModel.findById(id).populate("productId");
        

    },
    async findbyidforeditdata(id) {

        return await SellerSupplyModel.findById(id).populate("productId");

    },
    async updatesupplybyid(id,data){

        return await SellerSupplyModel.findByIdAndUpdate(id,data);
        
    },
    async findSupplyBasedonProductid(filter){

        return await SellerSupplyModel.find(filter).populate('productId');
    },
    async findSupplyForCheckProductId(id){

        return await SellerSupplyModel.findById(id);
        

    },


};






module.exports = SellerSupplyService;