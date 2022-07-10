
const SellerService = require('../services/seller-service');


async function SellerActivateMiddleware(req, res, next) {

    //console.log("activate middleware ");

    const { seller } = req;

    try {
        const result = await SellerService.findSellerById(seller._id);

        if (!(result.activated)) {

            //console.log("seller not completed is profile ");

            return next({ status: 400, message: "please update your profile to make or map  payment" });
        }

        // console.log("seller is activate his  profile");

        req.mangerId = result.mangerId;//

        next();// next function call

    } catch (error) {

        //console.log(error);

        return next(error);

    }

}



module.exports = SellerActivateMiddleware;
