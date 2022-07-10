
const MangerAuditModel=require('../../models/manger-audit-model');


const MangerAuditService={

    async regsiterMangerAudit(data){

        return await MangerAuditModel.create(data);
    },
    async findAllAduditByMangerId(filter){

        return await MangerAuditModel.find(filter);
        

    },


};



module.exports=MangerAuditService;
