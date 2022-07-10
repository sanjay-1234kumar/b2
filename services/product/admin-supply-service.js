
const SellerSupplyModel=require('../../models/seller-supply-model');

const AdminSupplyService={

    async findAllSupply(){

        return await SellerSupplyModel.find({}).populate("productId").populate("sellerId").sort({_id:-1});

        
    },
    async findSupplyBasedOnProductid(filter){

        return await SellerSupplyModel.find(filter).populate("productId").populate("sellerId").sort({price:1});
        
    },
    async findSupplyBasedOnSupplyid(filter){
        return await SellerSupplyModel.find(filter).populate("productId");
        
    }

};







module.exports=AdminSupplyService;
