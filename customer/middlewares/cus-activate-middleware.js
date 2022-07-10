

const CustomerService=require('../services/cus-customer-service');


async function customerActivateMiddlewre(req, res, next) {

    //console.log("customer activate middleware");
    
    const{customer}=req;


    let MyCustomer;//customer={_id:"101",role:"",activated:true}

    if(!(customer.activated)){

        //console.log("customer is updated his prfile plese update your profile");
        return next({status:400,message:"customer is updated his prfile plese update your profile"});

    }

    try {
        MyCustomer=await CustomerService.findCustomerById(customer._id);

        req.cusMangerId=MyCustomer.mangerId;//attch to req

        next();

    } catch (error) {
        
       // console.log(error);
        return next(error);

    }



}



module.exports = customerActivateMiddlewre;