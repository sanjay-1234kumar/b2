const SellerModel=require('../models/seller-model');

const SellerService={

    async findSeller(filter){

        const seller=await SellerModel.findOne(filter);

        return seller;
        
        
    },
    async createSeller(data){

        const seller=await SellerModel.create(data);
        return seller;
        
    },
    async findSellerAndUpdate(id,data){

        const result=await SellerModel.findByIdAndUpdate(id,data);

        return result;
    },
    async findSellerById(id){

        const result=await SellerModel.findById(id);

        return result;
        
    },
    async findSellersForManger(filter){

        return await SellerModel.find(filter);

    },
    async findSellerWithDetails(id){

    
        return await SellerModel.findById(id).populate('fullAddress').populate('pincodeId');
    },
    
    
    async findSellerByidAndUpdateSeller(id,data){

        return await SellerModel.findByIdAndUpdate(id,data);

    },
};



module.exports=SellerService;
