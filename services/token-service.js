
const jwt = require('jsonwebtoken');


const sellerAccessTokenSecert = process.env.SELLER_ACCESS_TOKEN_SECERT;

const sellerRefreshTokenSecert = process.env.SELLER_REFRESH_TOKEN_SECERT;

const SellerRefreshModel = require('../models/seller-refresh-model');



const TokenService = {

    genrateSellerTokens(data) {

        const sellerAccessToken = jwt.sign(data, sellerAccessTokenSecert, {
            expiresIn: '1h',
        });

        const sellerRefreshToken = jwt.sign(data, sellerRefreshTokenSecert, {
            expiresIn: '1y',

        });

        return {
            sellerAccessToken,
            sellerRefreshToken
        }

    },
    async storeRefreshTokenSeller(token, sellerId) {

        const result = await SellerRefreshModel.create({
            token,
            sellerId
        });

        return result;

    },
    async verifySellerAccessToken(token) {

        return jwt.verify(token, sellerAccessTokenSecert);

    },

    async verifySellerRefreshToken(token) {

        return jwt.verify(token, sellerRefreshTokenSecert);

    },

    async findRefreshTokenInDb(sellerId, token) {

        const result = await SellerRefreshModel.findOne({ sellerId: sellerId, token: token });

        return result;


    },

    async updateSellerRefreshToken(sellerId, prtoken, ntoken) {

        return await SellerRefreshModel.findOneAndUpdate({ sellerId: sellerId, token: prtoken }, { token: ntoken });

    },

    async removeSellerRefreshTokenDb(sellerId,refreshToken) {


        return await SellerRefreshModel.deleteOne({ sellerId,token: refreshToken });// sir eka object kobar delete karegaya
        // token feild unique hai 



    }


};



module.exports = TokenService;


