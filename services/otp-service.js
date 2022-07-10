
const crypto = require('crypto');

const axios = require('axios');


const ApiKey = process.env.FSMSAPI;

const HashService = require('../services/hash-service');

const OtpService = {

    async generateOtp() {

        const otp = crypto.randomInt(1000, 9999);

        return otp;

    },
    async sendOtp(otp, number) {

        return new Promise(async (resolve, reject) => {

            try {
                const result = await axios.get('https://www.fast2sms.com/dev/bulkV2', {
                    params: {
                        authorization: ApiKey,
                        variables_values: `${otp} By Archana Marketing`,
                        route: "otp",
                        numbers: `${number}`,
                        sender_id: "FTWSMS",
                    }
                });

                return resolve(result);

            } catch (error) {

                return reject(error);
            }
        })
    },
    verifyHashOtp(hashOtp, data) {
        let computedHash = HashService.hashOtp(data);

        if (computedHash === hashOtp) {

            return true;
        }
        else {
            return false;
        }


    },

};



module.exports = OtpService;
