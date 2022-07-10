
const AdminSupplyService = require('../services/product/admin-supply-service');


const AdminSupplyController = {

    async adminAllListofSupply(req, res, next) {

        //find all litis of supply
       // console.log("route call supply list admin");

        try {
            const result = await AdminSupplyService.findAllSupply();

            //console.log(result);

            return res.json({ or: true, result });

        } catch (error) {

            return next(error);

        }
        

    },
    async findSupplyBasedOnProductId(req, res, next) {

       // console.log(req.query);

        const { productId } = req.query;
        
        if (!productId) {

            //console.log("validation error");

            return next({ status: 400, message: "id is not provided" });

        }

        try {

            const result = await AdminSupplyService.findSupplyBasedOnProductid({productId:productId});
            
           // console.log(result);

            return res.json({ or: true, result });

        } catch (error) {

           // console.log(error);

            return next(error);

        }

    },
    async findSupplyBasedOnSupplyId(req, res, next) {

        //console.log(req.query);

        const { supplyId } = req.query;

        if (!supplyId) {

            //console.log("validation error");

            return next({ status: 400, message: "id is not provided" });

        }

        try {

            const result = await AdminSupplyService.findSupplyBasedOnProductid({ _id: supplyId });

            //console.log(result);

            return res.json({ or: true, result });

        } catch (error) {

            //console.log(error);
            
            return next(error);
        }
    },


};


module.exports = AdminSupplyController;



