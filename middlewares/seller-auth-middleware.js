const TokenService = require("../services/token-service");

const SellerService = require('../services/seller-service');


async function sellerAuthMiddleware(req, res, next) {

    //console.log("auth middle are woking ");

    const { sellerRefreshToken, sellerAcessToken } = req.cookies;

    if (!sellerAcessToken || !sellerRefreshToken) {

        //console.log("req.cookie mai accesstoken nahi diya or refresh nahi diya");

        return next({ status: 400, message: "access token are not provide by seller" });

    }

    try {

        // verify token 

        const sellerData = await TokenService.verifySellerAccessToken(sellerAcessToken);

        //console.log("we are finding seller data after verifying the  the token");

        //console.log(sellerData);



        if (!sellerData) {


            return next({ status: 400, message: "seller not found accesstoken some one has alter the token" });


        }

        // check seller is prsent in dbatae or not 

        try {

            const result = await SellerService.findSeller({ _id: sellerData._id });

            if (!result) {

                return next({ status: 400, message: "invalid seller id " });

            }

            req.seller = sellerData;//{_id:"",role:"",activated:""}

            next();// seller._id

        } catch (error) {

            //console.log("seller not found in databse ");

            return next(error);

        }



    } catch (error) {
        //console.log("error of jwt expired for 1minute");
        // console.log(error);

        return next({ status: 401, message: "access has been expired or invalid token" });

    }


}


module.exports = sellerAuthMiddleware;
