
const CustomerService = require('../services/cus-customer-service');

const PinService = require('../../services/pin-service');

const MangerService = require('../../manger/services/manger-service');

const SellerCitySerAvalService = require('../../services/serAvailble-service');

const CustomerActivateController = {

    async activateCustomer(req, res, next) {

        //console.log(req.body);

        const { customer } = req;//_id


        let { name, address1, address2, city, state, country, pincode } = req.body;

        // valdition error 

        if (!name || !address1 || !address2 || !city || !state || !country || !pincode) {

            //console.log("valdtion error ");

            return next({ status: 400, message: "all feilds are required" });

        }

        // type casting 

        name = name.toLowerCase();
        address1 = address1.toLowerCase();
        address2 = address2.toLowerCase();
        pincode = parseInt(pincode);

        // find pincode refrence then mangerId

        let PinRef;

        try {

            PinRef = await PinService.findSingleForActivate({ pincode: pincode });//exist not

            if (!PinRef) {

                //console.log("this pincode not found in the pincode db");

                return next({ status: 400, message: "invalid pincode this pincode not found" });

            }

            //console.log(PinRef);// 481880

        } catch (error) {

            //console.log(error);

            return next(error);

        }

        //find mangerRef manger={pincode:"pin41180",} in41180
        let MyManger;

        try {
            MyManger = await MangerService.findMangerForSeller({ pincodeId: PinRef._id });

            if (!MyManger) {

                //console.log("manger not found in the databse in valid pincodeId");

                return next({ status: 400, message: "manger not found in the databse in valid pincodeId" })
            }

            //console.log(MyManger);

        } catch (error) {

            //console.log(error);

            return next(error);

        }

        let MyFullAdress;

        try {

            MyFullAdress = await SellerCitySerAvalService.findRefrenceForCustomer({ nameOfCity: city, stateOfCity: state, countryOfCity: country });


            if (!MyFullAdress) {

               // console.log("invalidt state country city");

                return next({ status: 400, message: "invalidt state country city" });
            }

            //console.log(MyFullAdress);


        } catch (error) {

            //console.log(error);

            return next(error);
        }


        // findbyid and upadate 

        let mydata = {
            name,
            address1,
            address2,
            fullAddress: MyFullAdress._id,//refrence of city service
            activated: true,
            mangerId: MyManger._id,// magner ka refrence 
            pincodeId: PinRef._id, // pincode ka refrence

        };

        try {

            const result = await CustomerService.updateCustomerProfile({ _id: customer._id }, mydata);

            //console.log(result);

            const customerDto = {
                _id: customer._id,
                role: customer.role,
                activated: true,
                name: name,
            };
            return res.json({ auth: true, customerDto });


        } catch (error) {

            //console.log(error);

            return next(error);
        }



    },
    async getCustomerProfile(req, res, next) {

        //console.log('route call getprofile');


        const { customer } = req;

        if (!(customer.activated)) {

            //console.log("customer is not activted");

            return next({ status: 400, message: "please complete your profile " });

        }

        try {

            const result = await CustomerService.getUserProfilewithdetailsbyid(customer._id);



            //console.log(result);

            const customerDto = {
                _id: result._id,
                name: result.name,
                address1: result.address1,
                phone: result.phone,
                address2: result.address2,
                fullAddress: result.fullAddress,
                mangerId: result.mangerId,
                activated: result.activated,
                pincodeId: result.pincodeId,
            };


            return res.json({ or: true, result: customerDto });

        } catch (error) {

            //console.log(error);

            return next(error);
        }


    },
    async getCustomerDataEditProfile(req, res, next) {

        //console.log("route get data  customer for editing");

        const { customer } = req;

        try {
            const result = await CustomerService.findCustomerByIdWithDetails(customer._id);

           // console.log(result);//populate hogya hai

            return res.json({ or: true, result });

        } catch (error) {

            //console.log(error);

            return next(error);
        }

    },

    async editUpdateCustomerProfile(req, res, next) {

       // console.log("route edit update customer");

        const { customer } = req;

        //console.log(req.body);

        let { name, address1, address2 } = req.body;

        if (!name || !address1 || !address2) {

            //console.log("valdation error all feilds are required");

            return next({ status: 400, message: "valdation error all feilds are required" })

        }
        //type cating

        name = name.toLowerCase();
        address1 = address1.toLowerCase();
        address2 = address2.toLowerCase();

        //findbyandUpdate the customer
        let mydata = {
            name,
            address1,
            address2,
        }
        try {

            const result = await CustomerService.findCustomerByIdAndUpdateProfile(customer._id, mydata);

            //console.log(result);

            return res.json({ or: true, result: result });

        } catch (error) {

            //console.log(error);
            
            return next(error);

        }
    },


};




module.exports = CustomerActivateController;