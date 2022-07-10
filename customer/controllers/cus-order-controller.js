
const CustomerCartService = require('../services/cus-cart-service');

const CustomerService = require('../services/cus-customer-service');

const CustomerOrderService = require('../services/cus-order-service');

const CustomerDeliveryService = require('../services/cus-delivery-service');

const CustomerOtpService = require('../services/cus-otp-service');


const DELIVERYTIMEID = process.env.DELIVERYTIMEID;



const CustomerOrderController = {


    async registerOrder(req, res, next) {

        const { customer, cusMangerId } = req;


        

        //console.log(req.body);// products=[] paymenttype 

        let products = [];

        // valdition error 

        if (!(req.body.products)) {

            // console.log("products are not req body");

            return next({ status: 400, message: "products array are not provied" });

        }

        products = req.body.products;


        //console.log(products);

        // find product multiple cart items in the cart product and customerid


        let MyCart;


        try {

            MyCart = await CustomerCartService.findMultipleProductsInCartForOrder(customer._id, products);

            if (MyCart.length === 0) {

                //console.log("my cart is empty no product id array invalid");

                return next({ status: 400, message: "my cart is empty no product id array invalid" });

            }

            //console.log(MyCart);

        } catch (error) {

            //console.log(error);

            return next(error);

        }

        // create order 
        // total amount total quantiny total deliverchagre // delivery time 

        // delivery time is culated from 'delivery time table
        // name address1 phone pincode  cutomerId 

        const totalamount = MyCart.reduce((acc, i) => {

            return acc + i.totalamount;
        }, 0);

        const totaldeliverycharge = MyCart.reduce((acc, i) => {

            return acc + i.totaldelivery;
        }, 0);


        const totalquantity = MyCart.reduce((acc, i) => {

            return acc + i.quantity;
        }, 0);

        // this delivery time is calculated frm delivertabel

        let myDelivery;

        try {

            myDelivery = await CustomerDeliveryService.findDeliverTimeByid(DELIVERYTIMEID);


            //console.log(myDelivery);


        } catch (error) {

            // console.log(error);

            return next(error);

        }


        const deliverDate = new Date(Date.now() + parseInt(myDelivery.time)).toJSON();


        //console.log(totalamount);

        //console.log(totaldeliverycharge);

        //console.log(totalquantity);

        //console.log(deliverDate);


        let items = MyCart.map((i) => {

            return {
                productId: i.productId,
                name: i.name,
                productImage: i.productImage,
                baseprice: i.baseprice,
                basedelivery: i.basedelivery,
                quantity: i.quantity,
                totalamount: i.totalamount,
                totaldelivery: i.totaldelivery,
            };
        });

        //console.log(items);

        // find customer

        let MyCustomer;

        try {

            MyCustomer = await CustomerService.findCustomer({ _id: customer._id });


            if (!MyCustomer) {

                return next({ status: 400, message: "customer not found in the databse" });

            }

            //console.log(MyCustomer);


        } catch (error) {

            //console.log(error);

            return next(error);

        }
        // ok every thing is okay 


        // final placed order

        let PrOrderData = {
            customerId: customer._id,
            totalamount: totalamount,
            totaldeliverycharge: totaldeliverycharge,
            totalquantity: totalquantity,
            totalAmountofOrder: totalamount + totaldeliverycharge,
            deliverDate: deliverDate,
            name: MyCustomer.name,
            address: MyCustomer.address1,
            phoneNumber: MyCustomer.phone,
            pincodeId: MyCustomer.pincodeId,
            fullAddress: MyCustomer.fullAddress,//full address of customer
            items: items,
            mangerId: cusMangerId,
        };



        let MyOrder;

        try {

            MyOrder = await CustomerOrderService.createOrder(PrOrderData);

            //console.log("order placed sucessfully");

            //console.log(MyOrder);


        } catch (error) {

            //console.log(error);


            return next(error);
        }

        // deleete cart items 

        try {

            const dacart = await CustomerCartService.findMultipleproductCartfordeleteforOrder(customer._id, products);

            //console.log("cart item successfully delted");

            //console.log(dacart);

        } catch (error) {

            //console.log(error);

            return next(error);

        }

        //send an alert to admin

        try {


            const { data } = await CustomerOtpService.sendAlert(MyCustomer.name, MyCustomer.phone, MyCustomer.address1);


            //console.log(data);


            //everything ok

            return res.json({ or: true, result: MyOrder });

        } catch (error) {


            // console.log(error);

            return next(error);
        }


    },

    async findAllOrderOfCustomer(req, res, next) {

        //console.log("route call for all orders");

        const { customer } = req;// jk

        try {

            const result = await CustomerOrderService.findAllOrderForCustomer({ customerId: customer._id });

            //console.log(result);
            // dto banna hai

            let OrderDto = result.map((i) => {

                return {
                    _id: i._id,
                    customerId: i.customerId,
                    totalamount: i.totalamount,
                    totaldeliverycharge: i.totaldeliverycharge,
                    totalquantity: i.totalquantity,
                    totalAmountofOrder: i.totalAmountofOrder,
                    deliverDate: i.deliverDate,
                    status: i.status,
                    paymentType: i.paymentType,
                    createdAt: i.createdAt,
                   
                }
            });


            //console.log(OrderDto);

            return res.json({ or: true, result: OrderDto });

        } catch (error) {

            ///console.log(error);

            return next(error);

        }


    },

    async findSingleOrderForCustomer(req, res, next) {

        //console.log("route call single order");

        const { customer } = req;

        const { id } = req.params;

        //console.log(id);


        if (!id) {

            //console.log("oder is not procved for order");

            return next({ status: 400, message: "order is not proived" });
        }

        try {

            const result = await CustomerOrderService.findSingleOrderofCustomer({ customerId: customer._id, _id: id });

            if (!result) {

                //console.log("no single order found invalid idorder");

                return next({ status: 400, message: "invalid order id" });
            }

            //console.log(result);


            let SingleOrderDto = {
                _id: result._id,
                customerId: result.customerId,
                totalamount: result.totalamount,
                totaldeliverycharge: result.totaldeliverycharge,
                totalquantity: result.totalquantity,
                totalAmountofOrder: result.totalAmountofOrder,
                deliverDate: result.deliverDate,
                address: result.address,
                pincodeId: result.pincodeId,
                fullAddress: result.fullAddress,
                status: result.status,
                paymentType: result.paymentType,
                items: result.items,
                createdAt: result.createdAt,
               
            };

            return res.json({ or: true, d: SingleOrderDto });

        } catch (error) {

            //console.log(error);

            return next(error);
        }
    },
    async cancelCustomerOrderById(req, res, next) {

        //console.log("route call route cancel order");

        // console.log(req.body);

        const { orderId } = req.body;


        if (!orderId) {

            //console.log("orderId is not provided by customer order not cancel");

            return next({ status: 400, message: "orderId is not provided by customer not cancel" })
        }



        //findoreder by and update status cancel

        try {

            await CustomerOrderService.findOrderByIdAndCancelOrder(orderId, { status: "cancel" });

            //console.log("order status become cancel succesffully");


        } catch (error) {

            //console.log(error);

            return next(error);

        }
        //find by order id

        try {

            const result = await CustomerOrderService.findOrderById(orderId);

            //console.log(result);


            return res.json({ or: true, result });

        } catch (error) {

            //console.log(error);


            return next(error);
        }


    },



};




module.exports = CustomerOrderController;


