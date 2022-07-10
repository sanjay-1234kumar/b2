
const MangerService = require('../services/manger-service');

const PinService = require('../../services/pin-service');

const SellerCitySerAvalService=require('../../services/serAvailble-service');

const MangerActivateController = {


    async activateManger(req, res, next) {

        const { manger } = req;
        console.log(req.body);

        let { name, des, address, city, state, pincode, imageOfBranch, country } = req.body;

        // valdition error

        if (!name || !des || !address || !city || !state || !pincode || !imageOfBranch || !country) {

            console.log("validtion error");
            return next({ status: 400, message: "all feilds are required" });
        }

        // type casting
        name = name.toLowerCase();
        des = des.toLowerCase();
        address = address.toLowerCase();
        pincode = parseInt(pincode);

        // find pincode refrence for manger

        let PinRef;

        try {

            PinRef = await PinService.findSingleForActivate({ pincode: pincode });

            if (!PinRef) {

                console.log("invalid pincode this pincode not found in db");
                return next({ status: 400, message: "invalid pincode this pincode not found in db" })
            }

            console.log(PinRef);

        } catch (error) {

            console.log(error);
            return next(error);

        }
        //check already exists of manger 

        let MangerExist;

        try {
            MangerExist = await MangerService.checkExistenceAlreadyManger(PinRef._id);

            console.log(MangerExist);

            if(MangerExist){

                console.log("manger is already exist in this pincode you cannot regsiter at this pincode");
                return next({status:400,message:"manger is already exist in this pincode you cannot regsiter at this pincode"})
            }

        } catch (error) {

            console.log(error);
            return next(error);

        }

    
        //find full address 

        let MangerFullAddress;

        try {
            
            MangerFullAddress=await SellerCitySerAvalService.findRefrenceForManger({nameOfCity:city,stateOfCity:state,countryOfCity:country});

            if(!MangerFullAddress){

                console.log("manger full address not found in city state country");

                return next({status:400,message:"invalid city state country"});

            }

            console.log(MangerFullAddress);

        } catch (error) {
            
            console.log(error);
            return next(error);

        }



        // update the recoder

        let mydata = {
            name,
            des,
            address,
            fullAddress:MangerFullAddress._id,//refrence of addresss 
            imageOfBranch,
            activated: true,
            pincodeId: PinRef._id,// pincode ka refrence de diya 
        };

        try {

            const result = await MangerService.upadetMangerProfile({ _id: manger._id }, mydata);

            console.log(result);

            console.log("manger update sucessfully");

        } catch (error) {

            console.log(error);
            return next(error);
        }


        try {

            const myManger = await MangerService.findSingleManger({ _id: manger._id });

            console.log(myManger);
            const mangerDto = {
                _id: myManger._id,
                role: myManger.role,
                activated: myManger.activated,
                name: myManger.name,
                imageOfBranch: myManger.imageOfBranch,

            };

            return res.json({ auth: true, mangerDto });

        } catch (error) {
            console.log(error);
            return next(error);
        }




    },


};


module.exports = MangerActivateController;
