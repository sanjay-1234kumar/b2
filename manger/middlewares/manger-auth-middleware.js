
const MangerTokenService=require('../services/manger-token-service');

const MangerService=require('../services/manger-service');


async function MangerAuthMiddler(req,res,next) {
    
console.log("manger auth middleware working");

    const{mangerRefreshToken,mangerAccessToken}=req.cookies;

    if(!mangerRefreshToken||!mangerAccessToken){
console.log("acces token or refresh token not found ");

        return next({status:400,message:"acces token or refresh token not found"})
    }

    // verify access token
let manger;

    try {
        manger=await MangerTokenService.verifyMangerAccessToken(mangerAccessToken);

        if(!manger){

            return next({status:400,message:"access token has been expierd"});
        }

        console.log(manger);

    } catch (error) {
        
        console.log(error);
        return next({status:401,message:"access token has been expierd"});
    }

    // check mnager in the databse or not

    let myManger;


    try {
        myManger=await MangerService.findSingleManger({_id:manger._id});

        if(!myManger){
return next({status:400,message:"in valid manger id "});
        }

        console.log(myManger);

        req.manger={_id:myManger._id,role:myManger.role,activated:myManger.activated};

        return next();// every thing ok

    } catch (error) {
        
        console.log(error);
        return next(error);
    }



}




module.exports=MangerAuthMiddler;
