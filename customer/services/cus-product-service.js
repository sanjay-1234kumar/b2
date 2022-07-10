
const SellerProductModel=require('../../models/seller-product-model');


const CustomerProductService={

    async findBasedOnQry(filter){

return await SellerProductModel.find( { $text : { $search : filter },status:true }).populate('catergory').populate('deliverTimeId').limit(10);

    },


    async findProductBasedOnId(filter){

        return await SellerProductModel.findOne(filter).populate('catergory').populate('deliverTimeId');

    },
    

};







module.exports=CustomerProductService;