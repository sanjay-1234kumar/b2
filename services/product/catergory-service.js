

const SellerCatergoryModel=require('../../models/seller-catergory-model');


const SellerCatergoryService={

    async createSellerCatergory(data){

        return await SellerCatergoryModel.create(data);
    },
    async findAllCatergory(){


        return await SellerCatergoryModel.find();
        
    },

    async findParentOfSub(data){

return await SellerCatergoryModel.findOne({name:data});

    },
    async fincatergorybyidwithdetails(id){

        return await SellerCatergoryModel.findById(id);
        
    },
    async findCatergoryByIdforEdit(id){

        return await SellerCatergoryModel.findById(id);

    },

    async updateCatergoryByid(id,data){

        return await SellerCatergoryModel.findByIdAndUpdate(id,data);
        
    },
};



module.exports=SellerCatergoryService;
