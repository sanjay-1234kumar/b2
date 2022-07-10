

const PinService = require('../services/pin-service');

const SellerPinController = {

    async addPincodeArea(req, res, next) {


        //console.log(req.body);


        let { name, des, totalP, pincode } = req.body;


        if (!name || !des || !totalP || !pincode) {

            //console.log("valdiation error");

            return next({ status: 400, message: "all feilds are reauired" });

        }

        // type casting
        name = name.toLowerCase();
        des = des.toLowerCase();
        totalP = parseInt(totalP);
        pincode = parseInt(pincode);

        //check istsis already present 
        let existPin;

        try {

            existPin = await PinService.checkAlreadyExist(pincode);

            //console.log(existPin);

            if (existPin) {

                //console.log("this is pin is already present");

                return next({ status: 400, message: "this pincode  is alreday present " });
            }

        } catch (error) {

            //console.log(error);

            return next(error);

        }

        try {
            const result = await PinService.addPincode({ name, des, totalP, pincode });

            //console.log(result);

            return res.json({ or: true, result });

        } catch (error) {

            //console.log(error);

            return next(error);

        }

    },

    async findAllPincode(req, res, next) {

        try {
            const result = await PinService.findAllPinforSeller();

            //console.log(result);

            return res.json({ or: true, result });

        } catch (error) {

            //console.log(error);

            return next(error);

        }

    },
    async findSinglePinbyid(req, res, next) {

        const { id } = req.params;

        // console.log(id);

        if (!id) {

            // console.log("valdation error ");

            return next({ status: 400, message: "valdation error for pin " });
        }

        try {

            const result = await PinService.findsinglebyidwithDetails(id);

            //console.log(result);

            return res.json({ or: true, result });

        } catch (error) {

            // console.log(error);

            return next(error);

        }

    },

    async getdataEditofSellerPincode(req, res, next) {


        const { id } = req.params;

        console.log(id);

        if (!id) {

            console.log("valdation error ");

            return next({ status: 400, message: "valdation error for pin " });
        }


        try {

            const result = await PinService.getDataforeditofPincode(id);

            console.log(result);

            return res.json({ or: true, result });

        } catch (error) {

            console.log(error);
            return next(error);

        }

    },

    async updateSellerPincodeById(req, res, next) {

        const { id } = req.body;

        console.log(id);

        console.log(req.body);

        if (!id) {

            console.log("valdation error ");

            return next({ status: 400, message: "valdation error for pin " });
        }

        let { name, des, totalP } = req.body;

        if (!name || !des || !totalP) {

            console.log("valdiation error");

            return next({ status: 400, message: "all feilds are reauired" });

        }

        // type casting
        name = name.toLowerCase();
        des = des.toLowerCase();
        totalP = parseInt(totalP);

        let mydata = {
            name,
            des,
            totalP
        };



        try {

            const result = await PinService.updateSellerPinbyid(id, mydata);

            console.log(result);

            return res.json({ or: true, result });

        } catch (error) {
            console.log(error);
            return next(error);

        }

    },


};


module.exports = SellerPinController;
