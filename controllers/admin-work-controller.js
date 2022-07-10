

const WorkerModel = require('../models/worker-model');

const WorkingModel = require('../models/working-model');

const WorkBookModel = require('../models/work-booking-model');


const AdminWorkController = {


    async getAllWorkers(req, res, next) {



        try {

            const result = await WorkerModel.find().populate('pincodeId').populate('fullAddress').sort({ _id: -1 });

            //console.log(result);


            const WorkerDto = result.map((i) => {
                return {
                    _id: i._id,
                    phone: i.phone,
                    name: i.name,
                    address: i.address,
                    adarNo: i.adarNo,
                    age: i.age,
                    bankNo: i.bankNo,
                    work: i.work,
                    isAvaible: i.isAvaible,
                    primage: i.primage,
                    status: i.status,
                    pincodeId: i.pincodeId,
                    fullAddress: i.fullAddress,
                }
            });


            return res.json({ or: true, result: WorkerDto });

        } catch (error) {

            //console.log(error);

            return next(error);

        }


    },
    async getAllWorkingSer(req, res, next) {


        try {

            const result = await WorkingModel.find();

            //console.log(result);

            const WorkDto = result.map((i) => {

                return {
                    _id: i._id,
                    nameofwork: i.nameofwork,
                    workimage: i.workimage,
                    status: i.status,
                }
            });

            return res.json({ or: true, result: WorkDto });

        } catch (error) {

            //console.log(error);

            return next(error);

        }
    },
    async getAllWorkBooking(req, res, next) {


        try {

            const result = await WorkBookModel.find().populate('pincodeId').populate('fullAddress').sort({ _id: -1 });

            //console.log(result);


            return res.json({ or: true, result });


        } catch (error) {

            //console.log(error);

            return next(error);

        }
    },
    async getSingleWorkBooking(req, res, next) {


        const { id } = req.params;

        if (!id) {

            //console.log("validition error");

            return next({ status: 400, message: "id is not provided" });

        }

        try {

            const result = await WorkBookModel.findById(id).populate('pincodeId').populate('fullAddress');

            //console.log(result);

            return res.json({ or: true, result });


        } catch (error) {


            //console.log(error);

            return next(error);
        }


    },
    async getDataForEditWorkingBook(req, res, next) {

        const { id } = req.params;

        if (!id) {

            //console.log("validition error");

            return next({ status: 400, message: "id is not provided" });

        }


        try {

            const result = await WorkBookModel.findById(id).populate('pincodeId').populate('fullAddress');

            // console.log(result);

            return res.json({ or: true, result });


        } catch (error) {


            //console.log(error);

            return next(error);
        }
    },
    async updateWorkingBooking(req, res, next) {

        //console.log(req.body);

        const { id, bookingStatus } = req.body;


        if (!id || !bookingStatus) {

            //console.log("validition error");

            return next({ status: 400, message: "id is not provided" });
        }

        //console.log("update route");


        try {

            const result = await WorkBookModel.findByIdAndUpdate(id, { bookingStatus: bookingStatus });

            //console.log(result);

            return res.json({ or: true, result });

        } catch (error) {

            //console.log(error);

            return next(error);
        }


    },






};










module.exports = AdminWorkController;

