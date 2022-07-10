

const SellerAlertService = require('../services/alert-service');

const SellerAlertController = {

    async allAlertForAdmin(req, res, next) {

        //console.log("all alert routes calling ");

        try {
            const result = await SellerAlertService.allAlert();

            //console.log(result);

            return res.json({ or: true, result });

        } catch (error) {


            //console.log(error);

            return next(error);

        }

    },
    async findSingleAlertbyId(req, res, next) {

        // console.log(req.params);

        const { id } = req.params;

        if (!id) {

            //console.log("validtion error id is not provided");
            return next({ status: 400, message: "id is not proviede" });

        }

        try {
            const result = await SellerAlertService.findSingleAlert(id);

            //console.log(result);

            return res.json({ or: true, result });

        } catch (error) {

            // console.log(error);

            return next(error);
        }


    },
    async getDataforSingleAlerforedit(req, res, next) {

        // console.log(req.params);

        const { id } = req.params;

        if (!id) {

            //console.log("validtion error id is not provided");

            return next({ status: 400, message: "id is not proviede" });

        }

        try {
            const result = await SellerAlertService.getDataforeditofAlert(id);

            //console.log(result);

            return res.json({ or: true, result });

        } catch (error) {

            //console.log(error);

            return next(error);
        }



    },

    async updateAlertStatus(req, res, next) {


        //console.log(req.body);

        const { id, status } = req.body;


        if (!id || !status) {
            // console.log("validtion error id is not provided");
            return next({ status: 400, message: "id is not proviede" });

        }

        //findby and update

        try {
            const result = await SellerAlertService.updateAlertbyid(id, { status: status });

            //console.log(result);

            return res.json({ or: true, result });

        } catch (error) {

            //console.log(error);

            return next(error);
        }


    },




};






module.exports = SellerAlertController;
