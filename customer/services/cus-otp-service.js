
const crypto = require('crypto');

const axios = require('axios');

const ApiKey = process.env.FSMSAPI;

const adminPhone = process.env.ADMINPHONE;


const CustomerHashService = require('./cus-hash-service');


const CustomerOtpService = {

    async generateRandomOtp() {
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
    async sendAlert(name, phone, address) {

        return new Promise(async (resolve, reject) => {

            try {
                const result = await axios.get('https://www.fast2sms.com/dev/bulkV2', {
                    params: {
                        authorization: ApiKey,
                        route: "v3",
                        sender_id: "FTWSMS",
                        message: `New Order Placed In Archana Marketing ${name} ${phone} ${address}`,
                        numbers: adminPhone,
                    }
                });

                return resolve(result);

            } catch (error) {

                return reject(error);
            }
        })


    },
    async sendWorkAlert(name, phone, address,work) {

        return new Promise(async (resolve, reject) => {

            try {
                const result = await axios.get('https://www.fast2sms.com/dev/bulkV2', {
                    params: {
                        authorization: ApiKey,
                        route: "v3",
                        sender_id: "FTWSMS",
                        message: `New Service Booking Palced  ${work} ${name} ${phone} ${address}`,
                        numbers: adminPhone,
                    }
                });

                return resolve(result);

            } catch (error) {

                return reject(error);
            }
        })


    },

    verifyOtpForCustomer(hashOtp, data) {

        let computedHash = CustomerHashService.hashOtp(data);


        if (computedHash === hashOtp) {

            return true;
        }
        else {
            // 7676utyr6766 not ii8789
            return false;
        }


    },

};






module.exports = CustomerOtpService;
