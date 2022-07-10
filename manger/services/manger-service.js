
const MangerModel=require('../../models/manger-model');


const MangerService={

async findSingleManger(filter){

    return await MangerModel.findOne(filter);

},
async createSingleManger(data){

    return await MangerModel.create(data);
    
},

async upadetMangerProfile(filter,data){

    return await MangerModel.updateOne(filter,data);
},

async findMangerForSeller(filter){

    return await MangerModel.findOne(filter);

},
async checkExistenceAlreadyManger(pincodeId){

    return await MangerModel.exists({pincodeId});
    
},

};






module.exports=MangerService;