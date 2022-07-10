
const SellerService = require('../services/seller-service');

const PinService = require('../services/pin-service');

const MangerService = require('../manger/services/manger-service');

const SellerCitySerAvalService = require('../services/serAvailble-service');

const ActivateSellerController = {


    async activateSeller(req, res, next) {

        // console.log(req.body);


        const { seller } = req;// dessrtinc from req

        // validation

        let { name, profileImage, des, catergory, nameofbussiness, gst, address1, address2, city, state, country, pincode } = req.body;

        if (!name || !profileImage || !des || !catergory || !nameofbussiness || !gst || !address1 || !address2 || !city || !state || !country || !pincode) {

            //console.log("valdtion error");

            return next({ status: 400, message: "all feilds are requrired" })
        }
        // converion

        pincode = parseInt(pincode);

        // findpincode then update

        let PinRef;

        try {
            PinRef = await PinService.findSingleForActivate({ pincode: pincode });

            if (!PinRef) {

                //console.log("invalid pincode not found in the databse");
                return next({ status: 400, message: "inavlid pincode in the databse" });

            }

            //console.log(PinRef);//_id:"",name:"",pincode
        } catch (error) {

            //console.log(error);
            return next(error);

        }

        //find manger based on pincode 

        let Mymanger;

        try {

            Mymanger = await MangerService.findMangerForSeller({ pincodeId: PinRef._id });

            if (!Mymanger) {

                //console.log("no manger found pincedo id ");

                return next({ status: 400, message: "no manger found with this pincode" });
            }

            //console.log(Mymanger);

        } catch (error) {

            //console.log(error);
            return next(error);


        }

        // found manger also

        //find address refrence 

        let MyFullAdress;

        try {

            MyFullAdress = await SellerCitySerAvalService.findRefrenceForSeller({ nameOfCity: city, stateOfCity: state, countryOfCity: country });

            if (!MyFullAdress) {

                //console.log("invalidt state country city");
                return next({ status: 400, message: "invalidt state country city" });
            }

            //console.log(MyFullAdress);

        } catch (error) {

            //console.log(error);
            return next(error);
        }


        const updateddata = {
            name,
            shopimage: profileImage,
            des,
            catergory,
            nameofbussiness,
            gst,
            address1,
            address1,
            fullAddress: MyFullAdress._id,
            activated: true,
            pincodeId: PinRef._id,//pincode ka refenc
            mangerId: Mymanger._id,//manger ka refrence
        };

        // update seller profile 
        try {
            await SellerService.findSellerAndUpdate(seller._id, updateddata);

            //console.log("seller is updated sucessuffly");

            try {
                // take seller after upadate of seller take from db
                const afterUpdateSeller = await SellerService.findSellerById(seller._id);

                const sellerDto = {
                    _id: afterUpdateSeller._id,
                    role: afterUpdateSeller.role,
                    activated: afterUpdateSeller.activated,
                    name: afterUpdateSeller.name,
                    shopimage: afterUpdateSeller.shopimage,

                };

                return res.json({ auth: true, sellerDto });

            } catch (error) {

                //console.log(error);
                return next(error);
            }

        } catch (error) {

            //console.log(error);
            return next(error);
        }
    },
    async getSellerProfile(req, res, next) {

        //console.log("route profile ");

        const { seller } = req;//_id

        try {

            const result = await SellerService.findSellerWithDetails(seller._id);

            //console.log(result);

            return res.json({ or: true, result });

        } catch (error) {

            //console.log(error);
            return next(error);
        }

    },
    async getSellerDataEditProfile(req, res, next) {

        //console.log("route get data  seller  for editing");

        const { seller } = req;//_id

        try {

            const result = await SellerService.findSellerWithDetails(seller._id);

            //console.log(result);

            return res.json({ or: true, result });

        } catch (error) {

            //console.log(error);

            return next(error);

        }

    },

    async editUpdateSellerProfile(req, res, next) {

        //console.log("route edit update seller ");

        const { seller } = req;//_id

        //console.log(req.body);

        let { name, des, catergory, nameofbussiness, address1 } = req.body;

        if (!name || !des || !catergory || !nameofbussiness || !address1) {

            //console.log("valdition error for seller edit profile");

            return next({ status: 400, message: "valdition error for seller edit profile" })
        }

        //typacasting

        name = name.toLowerCase();
        des = des.toLowerCase();
        catergory = catergory.toLowerCase();
        nameofbussiness = nameofbussiness.toLowerCase();
        address1 = address1.toLowerCase();

        //find by id and updated
        let mydata = {
            name,
            des,
            catergory,
            nameofbussiness,
            address1,

        }

        try {
            const result = await SellerService.findSellerByidAndUpdateSeller(seller._id, mydata);

            //console.log(result);

            return res.json({ or: true, result });

        } catch (error) {

            //console.log(error);

            return next(error);
        }

    },

};



module.exports = ActivateSellerController;
