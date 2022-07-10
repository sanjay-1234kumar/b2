
const OtpService = require('../services/otp-service');

const HashService = require('../services/hash-service');

const SellerService = require('../services/seller-service');

const TokenService = require('../services/token-service');


const AuthSellerController = {

    async sendOtp(req, res, next) {

        //console.log('/api/seller/send-otp');

        //console.log(req.body);

        const { phone } = req.body;

        // validiton err
        if (!phone) {

            return next({ status: 400, message: "phone feild is required" });

        }

        let nphone = `+91${phone}`;

        //generate random otp
        // 4567
        const otp = await OtpService.generateOtp();

        //console.log(otp);

        // hash otp 

        const ttl = 1000 * 60 * 2;// 5minute time 

        const expires = Date.now() + ttl;//1000+983

        const mydata = `${nphone}.${otp}.${expires}`;//'+919131683474.4556.817772727'


        const hash = HashService.hashOtp(mydata);

        //console.log(hash);

        // send otp phone number by twillo

        try {

            const { data } = await OtpService.sendOtp(otp, phone);

            //console.log(data);

            if (!(data.return)) {


                return next({ status: 400, message: "invalid phone number" });
            }

            

            return res.json({
                hash: `${hash}.${expires}`,
                phone: nphone,

            });
            // hash expries ki  time =10


        } catch (error) {

            //console.log(error);
            return next(error);

        }


    },

    async verifyOtp(req, res, next) {

        //console.log("route call /api/seller/verify-otp");

        const { otp, hash, phone } = req.body;

        //console.log(req.body);

        // hasd=uiuou8.89898

        if (!otp || !hash || !phone) {

            return next({ status: 400, message: 'all feilds are required' });

        }

        const [hashedOtp, expires] = hash.split('.');


        if (Date.now() > expires) {

            return next({ status: 400, message: "otp hash been exipred" });

        }

        const data = `${phone}.${otp}.${expires}`;


        const isValid = OtpService.verifyHashOtp(hashedOtp, data);

        if (!isValid) {

            return next({ status: 400, message: "invalid otp " });
        }

        let seller;


        // token related work 
        try {

            seller = await SellerService.findSeller({ phone: phone });

            if (!seller) {
                // seller not found db 
                try {
                    seller = await SellerService.createSeller({ phone: phone });

                    //console.log("new seller is created");

                } catch (error) {
                    //console.log(error);

                    return next(error);
                }

            }

            //console.log(seller);
            // token service 

            const { sellerAccessToken, sellerRefreshToken } = TokenService.genrateSellerTokens(
                { _id: seller._id, role: seller.role, activated: seller.activated });


            //console.log(sellerAccessToken);

            //console.log(sellerRefreshToken);

            // save refresh token to databse 
            try {
                const rfresult = await TokenService.storeRefreshTokenSeller(sellerRefreshToken, seller._id);

                //console.log("seller refresh model new objectred is created");

                //console.log(rfresult);// {token:"sdfs",sellerId:"tr",_id:""}

            } catch (error) {

                //console.log(error);

                return next({ status: 500, message: "refresh token not saved in db" });

            }


            // cookie work

            res.cookie('sellerRefreshToken', sellerRefreshToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true,
            });


            res.cookie('sellerAcessToken', sellerAccessToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true,
            });


            const sellerDto = {
                role: seller.role,
                activated: seller.activated,
                _id: seller._id,
                name: seller.name ? seller.name : null,
                shopimage: seller.activated ? seller.shopimage : null,
            };


            return res.json({
                auth: true,
                sellerDto,
            });


        } catch (error) {

            //console.log(error);
            return next(error);


        }


    },

    async sellerRefresh(req, res, next) {
        // public route 

        //get refresh  token from cookie
        // verify refresh token 
        // check refresh token is db databse 
        // then generate new token 
        // then update token twith new token 
        // set cookie 
        //console.log("/route /api/seller/refresh");


        const { sellerRefreshToken: sellerRefreshTokenFromCookie } = req.cookies;//

        //console.log("seller refresh token from cookie is ");

        //console.log(sellerRefreshTokenFromCookie);

        if (!sellerRefreshTokenFromCookie) {

            return next({ status: 400, message: "req cookies mai sellerRefreshToken nahi diya gya" });

        }
        // verify sellerRefreshToken
        let seller;

        try {

            seller = await TokenService.verifySellerRefreshToken(sellerRefreshTokenFromCookie);

            if (!seller) {
                return next({ status: 400, message: "seller not found refreshtoken some alter the token" });

            }


            //console.log(seller);


        } catch (error) {

            //console.log("refresh token has been expired");

            return next({ status: 400, message: "refresh token has been expired please login agin" });

        }
        // check token is present or not the data base
        let result;

        try {

            result = await TokenService.findRefreshTokenInDb(seller._id, sellerRefreshTokenFromCookie);

            if (!result) {
                return next({ status: 400, message: "seller token not found seller refresh table in valid seller id" });
            }

            //console.log(result);

        } catch (error) {

            //console.log(error);
            return next(error);

        }

        // check seller is present in the databse or not unless he delete the account

        let mySeller;

        try {

            mySeller = await SellerService.findSeller({ _id: seller._id });

            if (!mySeller) {

                return next({ status: 400, message: "seller not found the seller databse in valid sellerid" });


            }

            // console.log(mySeller);

        } catch (error) {

            //console.log(error);

            return next(error);
        }

        // generate selleraccesstoken and refreshtoken

        const { sellerAccessToken, sellerRefreshToken } = TokenService.genrateSellerTokens({ _id: mySeller._id, role: mySeller.role, activated: mySeller.activated });


        // update sellerRefreshModel by sellerRefreshToken

        try {
            const updatedToken = await TokenService.updateSellerRefreshToken(mySeller._id, sellerRefreshTokenFromCookie, sellerRefreshToken);

            //console.log(updatedToken);

        } catch (error) {
            //console.log("error in updating sellerRefresh prvoius token with new token");

            return next(error);
            //
        }
        // put in to the cookie
        // cookie work

        res.cookie('sellerRefreshToken', sellerRefreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });


        res.cookie('sellerAcessToken', sellerAccessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });

        const sellerDto = {
            _id: mySeller._id,
            role: mySeller.role,
            activated: mySeller.activated,
            name: mySeller.name ? mySeller.name : null,
            shopimage: mySeller.activated ? mySeller.shopimage : null
        };

        return res.json({ auth: true, sellerDto });

    },
    async logout(req, res, next) {

        // take refreshfrom the cookie
        // delete refresh token from cookie 
        // delete cookies
        const { seller } = req;
        const { sellerRefreshToken } = req.cookies;//

        try {
            const result = await TokenService.removeSellerRefreshTokenDb(seller._id, sellerRefreshToken);

            //console.log("refresh token suceesfully delete from db");

            //console.log(result);

        } catch (error) {
            return next(error);

        }

        res.clearCookie('sellerRefreshToken');
        res.clearCookie('sellerAcessToken');

        return res.json({ auth: false, sellerDto: null });

    },

};



module.exports = AuthSellerController;
