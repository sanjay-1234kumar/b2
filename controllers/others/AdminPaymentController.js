
const PaymentModel = require('../../models/seller-payment-model');


const AdminPaymentController = {



    async findAllPaymentofAdmin(req, res, next) {

        //find all payment
        try {

            const result = await PaymentModel.find().populate("orderId").populate("sellerId").sort({_id:-1});

            //console.log(result);

            return res.json({ or: true, result });

        } catch (error) {

            //console.log(error);

            return next(error);

        }
    },

    async findSingleForAdmin(req, res, next) {

        //console.log(req.params);

        const { id } = req.params;

        if (!id) {

            //console.log("validtion error");

            return next({ status: 400, message: "all feilds are requirde" });
        }

        try {

            const result = await PaymentModel.findById(id).populate("orderId").populate("sellerId");

            //console.log(result);

            return res.json({ or: true, result });

        } catch (error) {

            //console.log(error);

            return next(error);
        }

    },


};






module.exports = AdminPaymentController;
