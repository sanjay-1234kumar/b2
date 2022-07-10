
const jwt=require('jsonwebtoken');

const mangerAccessTokenSecert=process.env.MANGER_ACCESS_TOKEN_SECERT;

const mangerRefreshTokenSeceert=process.env.MANGER_REFRESH_TOKEN_SECERT;

const MangerRefreshModel=require('../../models/manger-refresh-model');


const MangerTokenService={

    generateTokensForManger(data){

        const mangerAccessToken=jwt.sign(data,mangerAccessTokenSecert,{expiresIn:'1h'});
        const mangerRefreshToken=jwt.sign(data,mangerRefreshTokenSeceert,{expiresIn:'1y'});

        return {mangerAccessToken,mangerRefreshToken};

    },

    async storeRefreshTokenofManger(token,mangerId){

        return await MangerRefreshModel.create({token,mangerId});
        
    },
    async verifyMangerRefreshToken(token){

        return jwt.verify(token,mangerRefreshTokenSeceert);

    },

    async findRefreshTokenOfMangerInDb(mangerId,token){

        return await MangerRefreshModel.findOne({mangerId,token});

    },

    async updateMangerRefreshToken(mangerId,prToken,updateToken){

        return await MangerRefreshModel.findOneAndUpdate({mangerId,token:prToken},{token:updateToken});

    },
    async removeMangerRefreshTokenFromDb(mangerId,token){

        return await MangerRefreshModel.deleteOne({mangerId,token});


    },
    async verifyMangerAccessToken(token){

        return jwt.verify(token,mangerAccessTokenSecert);
        
    }
    


};



module.exports=MangerTokenService;
