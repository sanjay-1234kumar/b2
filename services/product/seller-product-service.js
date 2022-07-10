
const SellerProductModel=require('../../models/seller-product-model');

const SellerProductService={

async createSingleProductFromSeller(data){

    return await SellerProductModel.create(data);
    
},
async findAllProductWithDetailsForSeller(){

return await SellerProductModel.find().populate('catergory').populate('tax').populate('parmentSeller').sort({_id:-1});

},
async findProductWithIdForMap(filter){

    return await SellerProductModel.findOne(filter);
    
    
},
async findbyidwithdetails(id){

    return await SellerProductModel.findById(id).populate('catergory').populate('tax').populate('parmentSeller');
    
},
async findbyidforeditdatawithdetials(id){

    return await SellerProductModel.findById(id).populate('catergory').populate('tax').populate('parmentSeller');
    
},
async findProductByidforupdateofproduct(id){


    return await SellerProductModel.findById(id);

},

async updateProductbyprId(id,data){

    return await SellerProductModel.findByIdAndUpdate(id,data);
    
},
async findSingleProductforAlert(filter){

    return await SellerProductModel.findOne(filter);
    
},
async findProductforsearch(filter){

    return await SellerProductModel.find(filter).populate('catergory').populate('tax');
    
},




};







module.exports=SellerProductService;
