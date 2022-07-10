
const SellerTaxModel=require('../../models/seller-tax-model');


const SellerTaxService={

    async createSingleTax(data){

        return await SellerTaxModel.create(data);

    },

    async findAllTax(){

        return await SellerTaxModel.find();

    },
    async findSingleTaxForProduct(filter){

        return await SellerTaxModel.findOne(filter);
        
    },
    async findSingleTaxbyid(id){
        return await SellerTaxModel.findById(id);
    },
    async findTaxforEditByid(id){

        return await SellerTaxModel.findById(id);
        
    },

    async updateTaxByid(id,data){

        return await SellerTaxModel.findByIdAndUpdate(id,data);
    },
    async findAllTaxlistarrayforaddProduct(){

        return await SellerTaxModel.find().distinct('name');

    },
    async findtaxbyidforproductupdate(id){

        return await SellerTaxModel.findById(id);
        
    },


};



module.exports=SellerTaxService;
