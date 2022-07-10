
const MangerOtpService = require('../services/manger-otp-service');

const MangerHashService = require('../services/manger-hash-service');

const MangerService = require('../services/manger-service');

const MangerTokenService = require('../services/manger-token-service');


const MangerAuthController = {



    async registerManger(req, res, next) {

        console.log(req.body);

        const { phone } = req.body;

        if (!phone) {

            return next({ status: 400, message: "all felids are required" });

        }
        //+9131683474
        const otp = await MangerOtpService.generateRandomOtp();

        console.log(otp);

        console.log(typeof (otp));//number


        const ttl = 1000 * 60 * 5;// 5minute time 

        const expires = Date.now() + ttl;//1000+5minutes

        const data = `${phone}.${otp}.${expires}`;//'9131683474.4556.817772727'

        const hash = MangerHashService.hashOtp(data);// phone.otp.epxires '+91316834.5444.4'

        console.log(hash);


        try {

            // await twilio 

            return res.json({
                phone,
                hash: `${hash}.${expires}`,
                otp
            })

        } catch (error) {

            console.log(error);
            return next(error);

        }


    },
    async verifyManger(req, res, next) {

        console.log(req.body);

        let { phone, otp, hash } = req.body;

        if (!phone || !otp || !hash) {

            console.log("valdition errior");
            return next({ status: 400, message: "all feilds are required" });
        }
        // type otp
        otp = parseInt(otp);

        const [hashedOtp, expires] = hash.split('.');// array['iyyy6688','8808080']

        // check otp has been expierd

        if (Date.now() > expires) {
            return next({ status: 400, message: "otp hash been exipred" });
        }

        const data = `${phone}.${otp}.${expires}`;

        // verify hash 

        const isValid = MangerOtpService.verifyHashOtp(hashedOtp, data);

        if (!isValid) {

            console.log("inavlid hash otp");
            return next({ status: 400, message: "invalid otp " });
        }
        // find manger in mangertable
        let manger;

        try {
            manger = await MangerService.findSingleManger({ phone: phone });

            if (!manger) {

                console.log("manger not found in the daatbe crete a new mager");

                try {
                    manger = await MangerService.createSingleManger({ phone: phone });

                } catch (error) {

                    console.log("creating manger error");
                    
                    console.log(error);
                    return next(error);
                }
            }

            console.log(manger);// role id activated false

        } catch (error) {

            console.log("error in findSingleMar");

            console.log(error);
            return next(error);// valistion error

        }

        // generte access token and refresh token

        const { mangerAccessToken, mangerRefreshToken } = MangerTokenService.generateTokensForManger({ _id: manger._id, role: manger.role, activated: manger.activated });

        console.log(mangerAccessToken);

        console.log(mangerRefreshToken);

        // save refresh token to the databse

        try {

            const refresult = await MangerTokenService.storeRefreshTokenofManger(mangerRefreshToken, manger._id);

            console.log("refresh token sucess saved to databse ");
            console.log(refresult);

        } catch (error) {

            console.log(error);
            return next(error);

        }

        // set cookie 


        res.cookie('mangerRefreshToken', mangerRefreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });


        res.cookie('mangerAccessToken', mangerAccessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });

        // everything is ok

        const mangerDto = {
            _id: manger._id,
            role: manger.role,
            activated: manger.activated,
            name: manger.name ? manger.name : null,
            imageOfBranch: manger.imageOfBranch ? manger.imageOfBranch : null,

        };


        return res.json({ auth: true, mangerDto });

    },
    async mangerRefresh(req, res, next) {
        //get refresh  token from cookie
        // verify refresh token 
        // check refresh token is db databse 
        // then generate new token 
        // then update token twith new token 
        // set cookie 

        const { mangerRefreshToken: mangerRefreshTokenFromCookie } = req.cookies;

        console.log(mangerRefreshTokenFromCookie);

        if (!mangerRefreshTokenFromCookie) {

            console.log("manger refrsh nahi diya hai");
            return next({ status: 400, message: "manger refrsh nahi diya hai" });
        }

        let manger;

        try {

            manger = await MangerTokenService.verifyMangerRefreshToken(mangerRefreshTokenFromCookie);

            if (!manger) {
                console.log("token verify error ");
                return next({ status: 400, message: "manger token not found " });

            }

            console.log(manger)//_id:"",role:"manger","activated":false

        } catch (error) {

            console.log("rfresh token has been expeired");
            return next({ status: 400, message: "rfresh token has been expeired" });
        }

        // find refreshtoken present in 

        let Refreshresult;

        try {

            Refreshresult = await MangerTokenService.findRefreshTokenOfMangerInDb(manger._id, mangerRefreshTokenFromCookie);

            if (!Refreshresult) {

                console.log("inavlidt token or customer id");
                return next({ status: 400, message: "inavlidt token or customer id" });
            }

            console.log(Refreshresult);

        } catch (error) {

            console.log(error);
            return next(error);
        }

        // check manger is present or in or not

        let myManger;

        try {
            myManger = await MangerService.findSingleManger({ _id: manger._id });

            if (!myManger) {

                console.log("my manger not found in db");
                return next({ status: 400, message: "my manger not found in db" })
            }

            console.log(myManger);

        } catch (error) {

            console.log(error);
            return next(error);

        }

        //generate new tokens

        const { mangerAccessToken, mangerRefreshToken } = MangerTokenService.generateTokensForManger({ _id: myManger._id, role: myManger.role, activated: myManger.activated });

        // upadet refresh model mangerRefreshToken


        try {

            const updateTokenResult = await MangerTokenService.updateMangerRefreshToken(myManger._id, mangerRefreshTokenFromCookie, mangerRefreshToken);

            console.log(updateTokenResult);
            console.log("token update sucessfully from db");
            //set coookie


            res.cookie('mangerRefreshToken', mangerRefreshToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true,
            });


            res.cookie('mangerAccessToken', mangerAccessToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true,
            });


            const mangerDto = {
                _id: myManger._id,
                role: myManger.role,
                activated: myManger.activated,
                name: myManger.name ? myManger.name : null,
                imageOfBranch: myManger.imageOfBranch ? myManger.imageOfBranch : null,

            };
            return res.json({ auth: true, mangerDto });


        } catch (error) {

            console.log(error);
            return next(error);

        }


    },

    async logoutmanger(req, res, next) {

        // take refreshToken from cookie
        // delete refreshToken from db

        const { manger } = req;

        const { mangerRefreshToken } = req.cookies;

        try {
            const result = await MangerTokenService.removeMangerRefreshTokenFromDb(manger._id, mangerRefreshToken);

            console.log(result);
            console.log("refresh token suceesfully delete from db");
            res.clearCookie('mangerRefreshToken');
            res.clearCookie('mangerAccessToken');

            return res.json({ auth: false, mangerDto: null });

        } catch (error) {

            console.log(error);
            return next(error);


        }


    },


};








module.exports = MangerAuthController;
