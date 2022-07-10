
const SellerCitySerAvailbleModel = require('../models/seller-citySerAval-model');

const CitySerAvailbleService = {


    async createCitySerAvailble(data) {

        return await SellerCitySerAvailbleModel.create(data);

    },
    async checkExistanceOPin(filter) {

        return await SellerCitySerAvailbleModel.exists(filter);
    },
    async findAllCityForAdmin(){

        return await SellerCitySerAvailbleModel.find().populate('pincodeOfCity');
  
    },
    async findAddressforCustomer(){

        const city=await SellerCitySerAvailbleModel.find().distinct('nameOfCity');

        const state=await SellerCitySerAvailbleModel.find().distinct('stateOfCity');

        const country=await SellerCitySerAvailbleModel.find().distinct('countryOfCity');

        const result=await SellerCitySerAvailbleModel.find().populate("pincodeOfCity").select({pincodeOfCity:1});

        const pincode=result.map((i)=>{

            return i.pincodeOfCity.pincode;
        });
      

        return {city,state,country:country[0],pincode:pincode.sort()};
        
    },
    async findRefrenceForCustomer(filter){

        return await SellerCitySerAvailbleModel.findOne(filter);
        
    },
    async findRefrenceForSeller(filter){
        return await SellerCitySerAvailbleModel.findOne(filter);

    },
    async findRefrenceForManger(filter){

        return await SellerCitySerAvailbleModel.findOne(filter);
    },
    async findCitySerByidWithDetails(id){
        
        return await SellerCitySerAvailbleModel.findById(id).populate("pincodeOfCity");
    },
    async findbyidforeditdata(id){

        return await SellerCitySerAvailbleModel.findById(id).populate("pincodeOfCity");

    },
    async findbyidforupdate(id,data){

        return await SellerCitySerAvailbleModel.findByIdAndUpdate(id,data);

    },

};





module.exports = CitySerAvailbleService;
