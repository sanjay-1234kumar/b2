
const PinService = require('../services/pin-service');

const CitySerAvailbleService = require('../services/serAvailble-service');

const SellerCitySerAvailbleController = {

    async registerCitySerAvaible(req, res, next) {

        let { nameOfCity, stateOfCity, countryOfCity, tierType, pin } = req.body;

        // validation error 

        //console.log(req.body);


        if (!nameOfCity || !stateOfCity || !countryOfCity || !tierType || !pin) {

            //console.log("valdition error all feilds are required");
            return next({ status: 400, message: "all feilds are required" });

        }

        //type casting

        nameOfCity = nameOfCity.toLowerCase();
        stateOfCity = stateOfCity.toLowerCase();
        countryOfCity = countryOfCity.toLowerCase();
        tierType = tierType.toLowerCase();
        pin = parseInt(pin);

        //fincode is present in the pincode table
        let MyPin;

        try {

            MyPin = await PinService.findSinglePincodeByPinSerAvail({ pincode: pin });

            if (!MyPin) {

                //console.log("invalid pin code not found in db ");

                return next({ status: 400, message: "invalid pin code not found in db" });
            }

            //console.log(MyPin);

        } catch (error) {

            //console.log(error);

            return next(error);

        }

        //ok create avail service 
        let mydata = {
            nameOfCity,
            stateOfCity,
            countryOfCity,
            tierType,
            pincodeOfCity: MyPin._id,

        };
        // check exists 

        let exist;

        try {
            exist = await CitySerAvailbleService.checkExistanceOPin({ pincodeOfCity: MyPin._id });

            //console.log(exist);// true if exist 

            if (exist) {

                return next({ status: 400, message: "this is pincode alreday present in the cityservicsstate" })
            }

        } catch (error) {

            //console.log(error);

            return next(error);

        }

        try {
            const result = await CitySerAvailbleService.createCitySerAvailble(mydata);


            //console.log(result);

            return res.json({ or: true, result });


        } catch (error) {

            //console.log(error);

            return next(error);

        }
    },

    async findCityStateCountry(req, res, next) {

        //console.log("all listis ");

        try {

            const result = await CitySerAvailbleService.findAllCityForAdmin();

            //console.log(result);


            return res.json({ or: true, result });


        } catch (error) {

            //console.log(error);
            return next(error);

        }



    },
    async findAllAddressCityStateForForm(req, res, next) {


        //console.log("route call full address for form");

        try {
            const result = await CitySerAvailbleService.findAddressforCustomer();

            //console.log(result);

            return res.json({ or: true, result: result });

        } catch (error) {

            //console.log(error);

            return next(error);

        }

    },

    async findSingleCitySerbyId(req, res, next) {

        console.log("route call get city data");

        console.log(req.params);

        const { id } = req.params;

        if (!id) {

            console.log("validtion error");

            return next({ status: 400, message: "all feilds are required" });

        }


        //find by id 

        try {
            const result = await CitySerAvailbleService.findCitySerByidWithDetails(id);
            console.log(result);

            return res.json({ or: true, result });

        } catch (error) {

            console.log(error);
            return next(error);

        }

    },

    async getDataofCitySerforEdit(req, res, next) {


        console.log("route call get city data");

        console.log(req.params);

        const { id } = req.params;

        if (!id) {

            console.log("validtion error");

            return next({ status: 400, message: "all feilds are required" });

        }


        //find by id 

        try {
            const result = await CitySerAvailbleService.findbyidforeditdata(id);
            console.log(result);

            return res.json({ or: true, result });

        } catch (error) {

            console.log(error);
            return next(error);

        }

    },

    async updateCitySer(req, res, next) {

        console.log(req.body);

        const { id } = req.body;

        if (!id) {

            console.log("validtion error");

            return next({ status: 400, message: "all feilds are required" });

        }

        let { nameOfCity, stateOfCity, countryOfCity, tierType } = req.body;


        if (!nameOfCity || !stateOfCity || !countryOfCity || !tierType) {

            console.log("valdition error all feilds are required");
            return next({ status: 400, message: "all feilds are required" });

        }

        //type casting

        nameOfCity = nameOfCity.toLowerCase();
        stateOfCity = stateOfCity.toLowerCase();
        countryOfCity = countryOfCity.toLowerCase();
        tierType = tierType.toLowerCase();


        let mydata = {

            nameOfCity,
            stateOfCity,
            countryOfCity,
            tierType

        };

        //find and update 

        try {

            const result = await CitySerAvailbleService.findbyidforupdate(id, mydata);
            console.log(result);

            return res.json({ or: true, result });

        } catch (error) {
            console.log(error);
            return next(error);
        }

    },


};



module.exports = SellerCitySerAvailbleController;
