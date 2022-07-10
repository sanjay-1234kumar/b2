
const AdminSellerService=require('./Services/Admin-seller-ser');

const AdminSellerController={

    async findAllSellerListforAdmin(req,res,next){

        try {
            const result=await AdminSellerService.findAllSeller();

            //console.log(result);
            

            return res.json({or:true,result});

        } catch (error) {
            
            //console.log(error);

            return next(error);
        }
    },

};



module.exports=AdminSellerController;
