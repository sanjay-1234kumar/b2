const crypto = require('crypto');

const CustomerHashService = {

    hashOtp(data) {
        const hash = crypto.createHmac('sha256', process.env.HASH_SECRET_FOR_CUS).update(data).digest("hex");

        return hash;

    },

};













module.exports = CustomerHashService;