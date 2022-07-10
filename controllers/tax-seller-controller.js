
const SellerTaxService = require('../services/product/tax-service');


const SellerTax = {

    async createTax(req, res, next) {

        //console.log(req.body);

        const { name, rate, des } = req.body;

        // validtion 
        if (!name  || !des) {

            return next({ status: 400, message: "all feilds are required" });

        }

        // created tax on db 
        try {

            const result = await SellerTaxService.createSingleTax({ name, rate:parseInt(rate), des });

            //console.log(result);

            const taxDto = {
                _id: result._id,
                name: result.name
            };
            return res.json({ pr: true, d: taxDto });


        } catch (error) {

            //console.log(error);

            return next(error);

        }

    },
    async getAllTax(req, res, next) {

        try {

            const result = await SellerTaxService.findAllTax();

            //console.log(result);

            let taxDto = result.map((i) => {

                return {
                    _id: i._id,
                    name: i.name,
                    rate: i.rate,
                    des: i.des,
                    status:i.status,
                }
            });

            return res.json(taxDto);
        } catch (error) {

            //console.log(error);

            return next(error);

        }
    },

    async findsingletaxbyid(req,res,next){

        console.log(req.params);
        
        const { id } = req.params;

        if (!id) {

            console.log("validation error");

            return next({ status: 400, message: "all feilds are required" });

        }

        try {
            const result = await SellerTaxService.findSingleTaxbyid(id);

            console.log(result);

            return res.json({ or: true, result });

        } catch (error) {

            console.log(error);

            return next(error);

        }

    },

    async getTaxDataForTax(req, res, next) {


        console.log(req.params);
        const { id } = req.params;

        if (!id) {

            console.log("validation error");

            return next({ status: 400, message: "all feilds are required" });

        }


        try {
            const result = await SellerTaxService.findTaxforEditByid(id);

            console.log(result);

            return res.json({ or: true, result });

        } catch (error) {

            console.log(error);

            return next(error);


        }

    },


    async updateTaxByid(req, res, next) {

        console.log("update tax reqbody");

        console.log(req.body);

        let { id, name, des, rate } = req.body;

        if (!id || !name || !des ) {

            console.log("valdition error");
            return next({ status: 400, message: "valdition error" })
        }

        //type casting

        name = name.toLowerCase();
        des = des.toLowerCase();
        rate = parseInt(rate);

        let mydata = {
            name, des, rate
        };


        try {

            const result = await SellerTaxService.updateTaxByid(id, mydata);
            console.log(result);
            return res.json({ or: true, result });
        } catch (error) {

            console.log(error);

            return next(error);
        }


    },



};

module.exports = SellerTax;
