

const WorkerModel = require('../models/worker-model');


const WorkingModel = require('../models/working-model');

const SellerModel = require('../models/seller-model');


const AllWorkController = {


    async registerWoker(req, res, next) {

        const { seller } = req;

        //console.log(req.body);

        let { name, phone, address, work, adarNo, bankNo, age, primage } = req.body;

        if (!phone || !adarNo || !bankNo || !age || !primage) {

            //console.log("validation error");

            return next({ status: 400, message: "all feilds are required" });
        }

        //type casting

        name = name.toLowerCase();
        phone = parseInt(phone);
        address = address.toLowerCase();
        age = parseInt(age);
        work = work.toLowerCase();
        adarNo = parseInt(adarNo);
        bankNo = parseInt(bankNo);


        //find admin seller deatils 

        let MyAdmin;

        try {
            MyAdmin = await SellerModel.findById(seller._id);

            //console.log(MyAdmin);

        } catch (error) {

            //console.log(error);

            return next(error);

        }


        const mydata = {
            name,
            phone,
            address,
            age,
            work,
            adarNo,
            bankNo,
            primage,
            mangerId: MyAdmin.mangerId,
            pincodeId: MyAdmin.pincodeId,
            fullAddress: MyAdmin.fullAddress,
        };

        try {

            const result = await WorkerModel.create(mydata);

            //console.log(result);

            return res.json({ or: true, result });


        } catch (error) {

            //console.log(error);

            return next(error);

        }


    },

    async registerWorking(req, res, next) {

        //console.log(req.body);
        

        let { nameofwork, primage } = req.body;

        if (!nameofwork || !primage) {

           // console.log("validtion error");

            return next({ status: 400, message: "all feilds are required" });

        }

        nameofwork = nameofwork.toLowerCase();

        const mydata = {

            nameofwork,
            workimage: primage,
        };


        try {

            const result = await WorkingModel.create(mydata);

            //console.log(result);

            return res.json({ or: true, result });

        } catch (error) {


            //console.log(error);

            return next(error);
        }


    },


};




module.exports = AllWorkController;
