
const CustomerOtpService = require('../services/cus-otp-service');

const CustomerHashService = require('../services/cus-hash-service');

const CustomerService = require('../services/cus-customer-service');

const CustomerTokenService = require('../services/cus-token-service');

const CustomerRefreshService = require('../services/cus-customer-refresh-service');

const CustomerCartService = require('../services/cus-cart-service');

const CustomerAuthController = {

    async registerSingleCustomer(req, res, next) {

        //console.log(req.body);// phone

        const { phone } = req.body;

        if (!phone) {

            //console.log("valdtion error");

            return next({ status: 400, message: "valdtion error all feilds are required" });

        }

        let nphone = `+91${phone}`;// +9191316834

        // console.log(phone);

        // gerate otp 

        const otp = await CustomerOtpService.generateRandomOtp();

        //console.log(otp);

        const ttl = 1000 * 60 * 2;// 2minutes

        const expires = Date.now() + ttl;

        const mydata = `${nphone}.${otp}.${expires}`;//+91312.4567.54354545

        // hash create hash

        //console.log(mydata);


        const hash = CustomerHashService.hashOtp(mydata);

        //console.log(hash);

        // send otp phone number then respones

        try {

            const { data } = await CustomerOtpService.sendOtp(otp, phone);

            //console.log(data);

            if (!(data.return)) {


                return next({ status: 400, message: "invalid phone number" });
            }

            return res.json({ phone: nphone, hash: `${hash}.${expires}`, });

        } catch (error) {
            //console.log(error);
            return next(error);
        }


    },
    async verifyhashotpofCustomer(req, res, next) {

        //console.log(req.body);

        let { hash, otp, phone } = req.body;// it will come redux store

        if (!hash || !otp || !phone) {

            // console.log("validation error");
            return next({ status: 400, message: "all feilds are required" });

        }

        // typing casting
        otp = parseInt(otp);//number

        const [hashedOtp, expires] = hash.split('.');// t665tty.778887778787


        if (Date.now() > expires) {

            //console.log("otp has been expired");

            return next({ status: 400, message: "otp hash been exipred" });// 

        }

        // verify otp with hash 

        const data = `${phone}.${otp}.${expires}`;// gernerate same or not 



        const isValid = CustomerOtpService.verifyOtpForCustomer(hashedOtp, data);//877878,88


        if (!isValid) {

            //console.log("verify error computed not matceded hash ");

            return next({ status: 400, message: "invalid otp " });
        }

        // create a customer but check customer 
        let MyCustomer;


        try {

            MyCustomer = await CustomerService.findCustomer({ phone: phone });//{}



            if (!MyCustomer) {
                // created a new user 
                try {
                    MyCustomer = await CustomerService.createCustomer({ phone: phone });

                    //  console.log("new customer is cretead");

                } catch (error) {

                    //console.log(error);

                    return next(error);
                }


            }

            //console.log(MyCustomer);

        } catch (error) {

            //console.log(error);

            return next(error);

        }

        // then generate token 

        const { customerAccessToken, customerRefreshToken } = CustomerTokenService.generateTokensForCus(
            { _id: MyCustomer._id, role: MyCustomer.role, activated: MyCustomer.activated, });


        //console.log(customerAccessToken);

        //console.log(customerRefreshToken);

        // save refresh token 
        try {

            const rfresult = await CustomerRefreshService.createCustomerWithRefresh({ token: customerRefreshToken, customerId: MyCustomer._id });

            // console.log("new refresh token is cretaed");

            //console.log(rfresult);


        } catch (error) {

            //console.log(error);

            return next(error);
        }

        // push cart cookie data 

        let { cart } = req.cookies;

        //console.log(cart);

        if (!cart) {
            console.log("cart is undefiend");
            cart = [];
        }

        let mdcart = cart.map((i) => {
            let ob = i;
            ob.customerId = MyCustomer._id;
            return ob;

        });

        //console.log(mdcart);



        let rtresult;

        for (let i = 0; i < mdcart.length; i++) {

            try {

                rtresult = await takeDataCookietoInsertInCustomerCart({ customerId: mdcart[i].customerId, productId: mdcart[i].productId }, mdcart[i]);


            } catch (error) {

                //console.log(error);

                return next(error);

            }

        }

        function takeDataCookietoInsertInCustomerCart(filter, data) {

            return new Promise(async (resolve, reject) => {

                //find in the customer cart 
                try {
                    let result = await CustomerCartService.findCartItemIsAlreadyPresent(filter);

                    if (result) {

                        //console.log("item already inserted in cart no opertion ");

                        return resolve(result);

                    } else {

                        // console.log("item is not already inserted in cart so added to customer opertion are must");

                        try {
                            let inresult = await CustomerCartService.insertSingleItemIntoCart(data);

                            return resolve(inresult);

                        } catch (error) {
                            return reject(error);
                        }

                    }

                } catch (error) {

                    return reject(error);
                }

            });
        }

        // clear cookie

        res.cookie('cart', [], {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });


        // set cookie 


        res.cookie('customerAccessToken', customerAccessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });

        res.cookie('customerRefreshToken', customerRefreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });



        const customerDto = {
            _id: MyCustomer._id,
            role: MyCustomer.role,
            activated: MyCustomer.activated,
            name: MyCustomer.name ? MyCustomer.name : null
        };




        return res.json({ auth: true, customerDto });


    },
    async refreshCustomerToken(req, res, next) {

        //get refresh  token from cookie 
        // verify refresh token 
        // check refresh token is db databse 
        // then generate new token 
        // then update token twith new token 
        // set cookie 

        //console.log("refresh route call /api/refresh ciustomer");

        const { customerRefreshToken: customerRefreshTokenFromCookie } = req.cookies;//

        //console.log(customerRefreshTokenFromCookie);

        if (!customerRefreshTokenFromCookie) {

            // console.log("req cookie mai koi refresh token nahi hai");

            return next({ status: 400, message: "req cookies mai refresh token nahi diya gay" })
        }

        //verify the refresh token


        let customer;

        try {
            customer = await CustomerTokenService.verifyRefreshTokenOfCustomer(customerRefreshTokenFromCookie);

            if (!customer) {

                return next({ status: 400, message: "some one alter the token" });

            }

            //console.log(customer);//{_id:"",role:"",activated:""}

        } catch (error) {

            //console.log(error);

            return next({ status: 400, message: "refresh token verify error expierd" });

        }

        // check reresh token in databes

        let result;

        try {
            result = await CustomerRefreshService.findRefreshTokenForCustomer(customer._id, customerRefreshTokenFromCookie);

            if (!result) {

                //console.log("refresh token not found the db base some has delete the token");

                return next({ status: 400, message: "fresh token not found the db base some has delete the token" });

            }

            //console.log(result);

        } catch (error) {

            //console.log(error);

            return next(error);

        }

        // check customer is present in db or not

        let MyCustomer;


        try {

            MyCustomer = await CustomerService.findCustomer({ _id: customer._id });

            if (!MyCustomer) {

                //console.log("customer not found in databse he dellete his accoutn");

                return next({ status: 400, message: "ustomer not found in databse he dellete his accoutn" });

            }

            //console.log(MyCustomer);

        } catch (error) {

            //console.log(error);

            return next(error);

        }

        // everything is ok then genrate new token 

        const { customerAccessToken, customerRefreshToken } = CustomerTokenService.generateTokensForCus({ _id: MyCustomer._id, role: MyCustomer.role, activated: MyCustomer.activated });


        //console.log("new tokens are ");
        //console.log(customerAccessToken);
        //console.log(customerRefreshToken);

        // then upadte refresh token with new token

        let updRefresh;

        try {
            updRefresh = await CustomerRefreshService.updateCustomerRefreshToken(MyCustomer._id, customerRefreshTokenFromCookie, customerRefreshToken);

            //console.log(" refresh token sucees fully");

            //console.log(updRefresh);

        } catch (error) {

            //console.log(error);

            return next(error);
        }
        // final set cookie 

        res.cookie('customerAccessToken', customerAccessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });

        res.cookie('customerRefreshToken', customerRefreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });




        const customerDto = {
            _id: MyCustomer._id,
            role: MyCustomer.role,
            activated: MyCustomer.activated,
            name: MyCustomer.name ? MyCustomer.name : null
        };

        return res.json({ auth: true, customerDto });

    },

    async logoutCustomer(req, res, next) {
        // delete refresh token from database

        // req.customer._id
        const { customerRefreshToken } = req.cookies;// refresh token


        try {
            const result = await CustomerRefreshService.deleteRefreshTokenofCustomer(req.customer._id, customerRefreshToken);

            //console.log("refresh token suceesfully delete from the databse");

            //console.log(result);

        } catch (error) {

            //console.log(error);

            return next(error);

        }

        // clear everying from the cooke

        res.clearCookie('customerAccessToken');
        res.clearCookie('customerRefreshToken');

        return res.json({ auth: false, customerDto: null });

    },

};






module.exports = CustomerAuthController;
