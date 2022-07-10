

const AdminOrderService = require('./Services/Admin-order-ser');

const AdminOrderController = {

    async findAllOrderForAdmin(req, res, next) {

        try {

            const result = await AdminOrderService.findAllOrders();


            //console.log(result);

            return res.json({ or: true, result });


        } catch (error) {

            //console.log(error);

            return next(error);

        }

    },
    async findSingleOrderforAdmin(req, res, next) {

        //console.log(req.params);

        const { id } = req.params;

        if (!id) {

            //console.log("validtion error");

            return next({ status: 400, message: "all feilds are required" });
        }
        //find order id

        try {

            const result = await AdminOrderService.findOrderById(id);

            ///console.log(result);

            return res.json({ or: true, result });

        } catch (error) {

            //console.log(error);

            return next(error);
        }

    },
    async getOrderDataforEdit(req, res, next) {

        //console.log(req.params);

        const { id } = req.params;

        if (!id) {

            //console.log("validtion error");

            return next({ status: 400, message: "all feilds are required" });
        }

        try {

            const result = await AdminOrderService.getDataforeditByid(id);

            // console.log(result);

            return res.json({ or: true, result });

        } catch (error) {

            //console.log(error);

            return next(error);
        }

    },

    async updateOrderStatusbyAdmin(req, res, next) {

        //console.log(req.body);

        const { id, status } = req.body;

        if (!id || !status) {

            // console.log("validtion error");

            return next({ status: 400, message: "all feilds are required" });
        }

        let updata = {
            status: status,
        };
        try {

            const result = await AdminOrderService.findByidAndupdateOrderStatus(id, updata);

            //console.log(result);

            return res.json({ or: true, result });

        } catch (error) {

            //console.log(error);

            return next(error);
        }

    },

};


module.exports = AdminOrderController;
