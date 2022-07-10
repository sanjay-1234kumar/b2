
const DeliveryTimeService = require('../services/delivertime-service');

const SellerDeliveryTimeController = {

    async registerDeliveryTime(req, res, next) {

        //console.log(req.body);

        let { name, des, time } = req.body;

        //validtion error 

        if (!name || !des || !time) {

            return next({ status: 400, message: "all feilds are requred" });

        }

        let mydata = {
            name,
            des,
            time: parseInt(time),
        };

        //insert to databse
        //1000*60*60*24 =1day
        try {

            const result = await DeliveryTimeService.insertTimeDelivery(mydata);

            //console.log(result);

            return res.json({ or: true, result });

        } catch (error) {

            //console.log(error);

            return next(error);

        }


    },

};



module.exports = SellerDeliveryTimeController;
