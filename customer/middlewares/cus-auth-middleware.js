
const CustomerTokenService = require('../services/cus-token-service');

const CustomerService = require('../services/cus-customer-service');

async function customerAuthMiddlewre(req, res, next) {
    

   // console.log("customer auth middlare ware working");
    // take access from req.cookies
    const { customerAccessToken } = req.cookies;


    if (!customerAccessToken) {
       
       // console.log("customer ne access nahi duay");
       
        return next({ status: 400, message: "access toke not found from cookies" });

    }

    // then verify the access token

    let customer;

    try {
        customer = await CustomerTokenService.verifyAccessTokenOfCustomer(customerAccessToken);

        
        if (!customer) {

            return next({ status: 401, message: "access has been invalid or expierd" });
        }

        //console.log(customer);

    } catch (error) {

       // console.log("access verify error token has been expierd");

        return next({ status: 401, message: "access token hasbenn expired " });

    }

    // find customer is present in databse or not

    let MyCustomer;


    try {

        MyCustomer = await CustomerService.findCustomer({_id:customer._id });

        if (!MyCustomer) {

           // console.log("customer not found in the databse");

            return next({ status: 401, message: "customer not found in the databse" });

        }

        //console.log(MyCustomer);

        // req.customer

        req.customer={
            _id:MyCustomer._id,
            role:MyCustomer.role,
            activated:MyCustomer.activated,
        };

        next();

    } catch (error) {
        
        //console.log(error);

        return next(error);

    }






}



module.exports = customerAuthMiddlewre;
