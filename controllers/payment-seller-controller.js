
const SellerPaymentService = require('../services/product/seller-payment-service');

const CustomerOrderService = require('../customer/services/cus-order-service');

const SellerPaymentController = {

    async createSinglePaymentForSeller(req, res, next) {

        //console.log(req.body);

        const { seller, mangerId } = req;//req.mangerId

        let { name, amount, sellerName, orderId, amountofbill } = req.body;// name of payment amount mnager name stasish
        // validation
        if (!name || !amount || !sellerName || !orderId || !amountofbill) {

           // console.log("validitoin error");
            return next({ status: 400, message: "all feilds are required" });

        }

        // type conversion

        name = name.toLowerCase();
        sellerName = sellerName.toLowerCase();
        amount = parseInt(amount);
        amountofbill = parseInt(amountofbill);


        // find order in order table

        let Myorder;


        try {

            Myorder = await CustomerOrderService.findOrderById(orderId);

            //console.log(Myorder);

        } catch (error) {

            //console.log(error);

            return next(error);

        }


        // create a payment 

        try {

            const data = {
                name: name,
                amount: amount,
                sellerName: sellerName,
                sellerId: seller._id,
                mangerId,
                orderId: Myorder._id,
                amountofbill: amountofbill,
            };

            const result = await SellerPaymentService.createSellerPaymentFromSeller(data);

            //console.log(result);

            return res.json({ or: true, result });

        } catch (error) {

            //console.log(error);

            return next(error);

        }

    },

    async findAllPaymentForSeller(req, res, next) {

        //console.log("all paymentns of sellers");

        const { seller } = req;

        try {

            const result = await SellerPaymentService.findPaymentForEachSeller({ sellerId: seller._id });


            //console.log(result);

            let PaymentDto = result.map((i) => {

                return {
                    _id: i._id,
                    name: i.name,
                    paymentStatus: i.paymentStatus,
                    amount: i.amount,
                    amountofbill: i.amountofbill,
                    sellerName: i.sellerName,
                    orderId: {
                        _id: i.orderId._id,
                        totalAmountofOrder: i.orderId.totalAmountofOrder,
                        status: i.orderId.status,

                    },
                    createdAt: i.createdAt,
                }
            });

            //console.log(PaymentDto);


            return res.json({ or: true, result: PaymentDto });


        } catch (error) {

            //console.log(error);

            return next(error);

        }

    },
    async findSinglePaymentbtid(req, res, next) {


        //console.log(req.params);

        const { id } = req.params;

        if (!id) {

           // console.log("validtion error id is provided");

            return next({ status: 400, message: "validtion error id is provided" });
        }

        //fin by id 


        try {

            const result = await SellerPaymentService.findSinglebyidwithDetails(id);
           
           // console.log(result);

            let SinglePaymentDto = {
                _id: result._id,
                name: result.name,
                paymentStatus: result.paymentStatus,
                amount: result.amount,
                amountofbill: result.amountofbill,
                sellerName: result.sellerName,
                orderId: {
                    _id: result.orderId._id,
                    totalAmountofOrder: result.orderId.totalAmountofOrder,
                    status: result.orderId.status,

                },
                createdAt: result.createdAt,
            };

            return res.json({ or: true, result: SinglePaymentDto });

        } catch (error) {

            //console.log(error);

            return next(error);

        }



    },
    async getdataforbyid(req, res, next) {

        //console.log(req.params);

        const { id } = req.params;

        if (!id) {

           // console.log("validtion error id is provided");

            return next({ status: 400, message: "validtion error id is provided" });
        }

        //find by id 

        try {

            const result = await SellerPaymentService.findbyiddataforedit(id);
            
            //console.log(result);

            let SinglePaymentDto = {
                _id: result._id,
                name: result.name,
                paymentStatus: result.paymentStatus,
                amount: result.amount,
                amountofbill: result.amountofbill,
                sellerName: result.sellerName,
                orderId: {
                    _id: result.orderId._id,
                    totalAmountofOrder: result.orderId.totalAmountofOrder,
                    status: result.orderId.status,

                },
                createdAt: result.createdAt,
            };

            return res.json({ or: true, result: SinglePaymentDto });

        } catch (error) {

            //console.log(error);

            return next(error);

        }

    },


    async updatePaymentbyid(req, res, next) {

        //console.log(req.body);

        const { id, paymentStatus } = req.body;

        if (!id || !paymentStatus) {
            
            //console.log("validtion error id is provided");

            return next({ status: 400, message: "validtion error id is provided" });
        }

        let mydata = {
            paymentStatus
        };
        //find id update 


        try {

            const result = await SellerPaymentService.findbyidupdatePaymentstatus(id, mydata);
          
          //  console.log(result);

            return res.json({ or: true, result });

        } catch (error) {

            //console.log(error);

            return next(error);
        }



    },

    async findPaymentbysearchOrderId(req, res, next) {

        const { seller } = req;

        //console.log(req.query);

        const { orderId } = req.query;

        if (!orderId) {

            //console.log("validtion error ");

            return next({ status: 400, message: "all felids are required" });
        }

        try {

            const result = await SellerPaymentService.findPaymentofSellerByOrderId(seller._id, orderId);


            //console.log(result);

            let PaymentDto = result.map((i) => {

                return {
                    _id: i._id,
                    name: i.name,
                    paymentStatus: i.paymentStatus,
                    amount: i.amount,
                    amountofbill: i.amountofbill,
                    sellerName: i.sellerName,
                    orderId: {
                        _id: i.orderId._id,
                        totalAmountofOrder: i.orderId.totalAmountofOrder,
                        status: i.orderId.status,

                    },
                    createdAt: i.createdAt,
                }
            });

            return res.json({ or: true, result: PaymentDto });

        } catch (error) {

            //console.log(error);

            return next(error);

        }


    },

};










module.exports = SellerPaymentController;
