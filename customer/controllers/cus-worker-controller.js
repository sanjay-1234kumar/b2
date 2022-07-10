

const WorkBooking = require('../../models/work-booking-model');

const Working = require('../../models/working-model');

const Customer = require('../../models/customer-model');

const CustomerOtpService = require('../services/cus-otp-service');

const CustomerWorkController = {


    async findAllWorkBooking(req, res, next) {

        const { customer } = req;

        try {

            const result = await WorkBooking.find({ customerId: customer._id }).populate('pincodeId').populate('fullAddress').sort({ _id: -1 });//latest

            //console.log(result);

            return res.json({ or: true, result });


        } catch (error) {


            //console.log(error);

            return next(error);

        }




    },

    async findSingleWorkBooking(req, res, next) {


        const { id } = req.params;

        if (!id) {

            //console.log("validation error");

            return next({ status: 400, message: "id is not provided by user" });

        }


        try {

            const result = await WorkBooking.findById(id).populate('pincodeId').populate('fullAddress');

            //console.log(result);

            const workbookdto = {
                _id: result._id,
                name: result.name,
                address: result.address,
                phoneNumber: result.phoneNumber,
                pincodeId: result.pincodeId,
                fullAddress: result.fullAddress,
                workname: result.workname,
                workimage:result.workimage,
                bookingStatus:result.bookingStatus,

            };

            return res.json({ or: true, result:workbookdto });

        } catch (error) {

            //console.log(error);

            return next(error);

        }
    },
    async regsiterWorkinForCustomer(req, res, next) {

        // console.log(req.body);

        const { workname, workimage } = req.body;
        //workimage


        if (!workname) {

            return next({ status: 400, message: "all feilds are required" });


        }

        const { customer } = req;

        let MyCustomer;

        try {

            MyCustomer = await Customer.findById(customer._id);

            //console.log(MyCustomer);


        } catch (error) {

            //console.log(error);

            return next(error);

        }

        //resgiter

        const mydata = {

            customerId: MyCustomer._id,
            name: MyCustomer.name,
            address: MyCustomer.address1,
            phoneNumber: MyCustomer.phone,
            pincodeId: MyCustomer.pincodeId,//refreence of pincode table
            fullAddress: MyCustomer.fullAddress,
            workname: workname,
            workimage: workimage,

        };


        try {

            const result = await WorkBooking.create(mydata);

            //console.log(result);

        } catch (error) {

            // console.log(error);

            return next(error);

        }

        //send a message to admin

        try {

            const { data } = await CustomerOtpService.sendWorkAlert(MyCustomer.name, MyCustomer.phone, MyCustomer.address1, workname);


            //console.log(data);

            return res.json({ or: true, result: data });


        } catch (error) {

            //console.log(error);

            return next(error);

        }



    },
    async findAllWorkList(req, res, next) {


        try {

            const result = await Working.find({ status: true }).sort({ nameofwork: 1 });//abc


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

};








module.exports = CustomerWorkController;
