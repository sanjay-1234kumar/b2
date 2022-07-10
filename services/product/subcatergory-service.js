
const SellerSubCatergoryModel=require('../../models/seller-subcatergory-model');


const SellerSubCatergoryService={

    async createSingleSubCatergory(data){

        return await SellerSubCatergoryModel.create(data);
    },

    async findAllSubCatergory(){

        return await SellerSubCatergoryModel.find().populate('parent');
        
    },
    async findSingleSubCaterForProduct(filter){

        return await SellerSubCatergoryModel.findOne(filter);
        
    },
    async findsubcatergorybyidwithdetails(id){

        return await SellerSubCatergoryModel.findById(id).populate('parent');
    },
    async getDataforeditByid(id){

        return await SellerSubCatergoryModel.findById(id).populate('parent');

    },
    async updateSubactergorybyid(id,data){


        return await SellerSubCatergoryModel.findByIdAndUpdate(id,data);
        
    },

    async findAllSubcatergoryforaddProduct(){

        return await SellerSubCatergoryModel.find().distinct('name');
    },
};





module.exports=SellerSubCatergoryService;
