
const ReturnModel = require('../../models/seller-return-model');

const SellerModel = require('../../models/seller-model');

const OrderModel = require('../../models/customer-order-model');


const AdminReturnController = {


    async registerReturn(req, res, next) {

        //console.log(req.body);

        let { name, amount, sellerId, retImage, billImage, orderId } = req.body;//

        if (!name || !amount || !sellerId || !retImage || !billImage || !orderId) {

            //console.log("valdition error all feilds are required");

            return next({ status: 400, message: "all feilds are required" });
        }
        //type casting

        name = name.toLowerCase();
        amount = parseInt(amount);

        let MySeller;

        try {


            MySeller = await SellerModel.findById(sellerId);

            //console.log(MySeller);

        } catch (error) {

            //console.log(error);

            return next(error);

        }

        let MyOrder;

        try {

            MyOrder = await OrderModel.findById(orderId);

            //console.log(MyOrder);

        } catch (error) {

            //console.log(error);

            return next(error);
        }


        let myData = {
            name,
            amount,
            sellerId: MySeller._id,
            orderId: MyOrder._id,
            retImage,
            billImage

        };


        try {

            const result = await ReturnModel.create(myData);

            //console.log(result);

            return res.json({ or: true, result });

        } catch (error) {

           // console.log(error);

            return next(error);
        }
    },
    async findAllReturnForAdmin(req, res, next) {

        try {

            const result = await ReturnModel.find().populate('sellerId').populate('orderId').sort({_id:-1});
            

            //console.log(result);


            let retDto = result.map((i) => {

                return {
                    _id: i._id,
                    name: i.name,
                    amount: i.amount,
                    sellerId: i.sellerId,
                    orderId: i.orderId,
                    retStatus: i.retStatus,
                    retImage: i.retImage,
                    billImage: i.billImage,
                    createdAt: i.createdAt,
                }
            });

            return res.json({ or: true, result: retDto });

        } catch (error) {

            //console.log(error);

            return next(error);
        }

    },

    async findSingleReturnforAdmin(req, res, next) {

        //console.log(req.params);

        const { id } = req.params;

        if (!id) {

            //console.log("validation error ");

            return next({ status: 400, message: "validation error" })
        }


        try {

            const result = await ReturnModel.findById(id).populate('sellerId').populate('orderId');
            
            //console.log(result);

            let singleRtDto = {
                _id: result._id,
                name: result.name,
                amount: result.amount,
                sellerId: result.sellerId,
                orderId: result.orderId,
                retStatus: result.retStatus,
                retImage: result.retImage,
                billImage: result.billImage,
                createdAt: result.createdAt,
            }
            return res.json({ or: true, result:singleRtDto });

        } catch (error) {

            //console.log(error);

            return next(error);
        }


    },

};



module.exports = AdminReturnController;
