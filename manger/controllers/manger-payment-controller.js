
const SellerPaymentService = require('../../services/product/seller-payment-service');


const MangerPaymentController = {


    async getAllPaymentForManger(req, res, next) {

        const { manger } = req;//{_id:"sa",role:""}

        try {
            const Payments = await SellerPaymentService.findAllPaymentsforMangerwithId({ mangerId: manger._id });

            console.log(Payments);

            return res.json({ pr: true, Payments });

        } catch (error) {

            console.log(error);
            return next(error);

        }

    },


};



module.exports = MangerPaymentController;