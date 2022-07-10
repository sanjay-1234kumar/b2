
const SellerService = require('../../services/seller-service');

const SellerReturnService = require('../../services/product/seller-return-service');

const CustomerOrderSerivce = require('../../customer/services/cus-order-service');


const MangerReturnController = {

    async registerReturnsOfManger(req, res, next) {

        const { manger } = req;
        console.log(req.body);

        let { name, amount, sellerId, retImage, billImage, orderId } = req.body;//

        if (!name || !amount || !sellerId || !retImage || !billImage || !orderId) {

            console.log("valdition error all feilds are required");
            return next({ status: 400, message: "all feilds are required" });
        }
        //type casting

        name = name.toLowerCase();
        amount = parseInt(amount);

        //find seller in db 
        let MySeller;

        try {
            MySeller = await SellerService.findSellerById(sellerId);
            console.log(MySeller);

        } catch (error) {

            console.log(error);
            return next(error);

        }

        let MyOrder;

        try {

            MyOrder = await CustomerOrderSerivce.findOrderById(orderId);

            console.log(MyOrder);


        } catch (error) {
            console.log(error);
            return next(error);

        }

        let myData = {
            name,
            amount,
            sellerId: MySeller._id,
            mangerId: manger._id,
            orderId: MyOrder._id,
            retImage,
            billImage

        };

        try {
            const result = await SellerReturnService.createReturnfromManger(myData);

            console.log(result);

            return res.json({ or: true, result });


        } catch (error) {

            console.log(error);
            return next(error);

        }




    },

    async findAllRetunrsForManger(req, res, next) {

        const { manger } = req;

        try {
            const result = await SellerReturnService.findAllReturnsofMangerById({ mangerId: manger._id });


            console.log(result);

            return res.json({ or: true, result });

        } catch (error) {

            console.log(error);
            return next(error);


        }

    },



};


module.exports = MangerReturnController;
