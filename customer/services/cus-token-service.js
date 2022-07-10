
const jwt=require('jsonwebtoken');

const customerAccessTokenSecert=process.env.CUSTOMER_ACCESS_TOKEN_SECERT;


const customerRefreshTokenSecert=process.env.CUSTOMER_REFRESH_TOKEN_SECERT;


const CustomerTokenService={

    generateTokensForCus(data){

        const customerAccessToken=jwt.sign(data,customerAccessTokenSecert,{expiresIn:'1h'});

        const customerRefreshToken=jwt.sign(data,customerRefreshTokenSecert,{expiresIn:'1y'});

        return {
            customerAccessToken,
            customerRefreshToken
        }

    },

     async verifyRefreshTokenOfCustomer(token){

        return  jwt.verify(token,customerRefreshTokenSecert);

    },

    async verifyAccessTokenOfCustomer(token){

        return jwt.verify(token,customerAccessTokenSecert);

    },




};







module.exports=CustomerTokenService;
