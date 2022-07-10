
const crypto = require('crypto');

const MangerHashService = require('./manger-hash-service');

const MangerOtpService = {

    async generateRandomOtp() {

        const otp = crypto.randomInt(1000, 9999);

        return otp;

    },
    verifyHashOtp(hashedOtp, data) {

        // gener data hash 
        const Myhash = MangerHashService.hashOtp(data);

        console.log(Myhash);

        console.log(hashedOtp);

        if (Myhash === hashedOtp) {
            return true;
        } else {
            return false;
        }
    },


};





module.exports = MangerOtpService;