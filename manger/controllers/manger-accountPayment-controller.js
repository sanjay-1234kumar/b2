
const PaymentService = require('../../services/product/seller-payment-service');

const OrderService = require('../../customer/services/cus-order-service');

const MangerAccountPayService = require('../services/manger-accountPay-service');


const MangerAccountPaymentController = {


  async registerAccountPayment(req, res, next) {

    const { manger } = req;//_id

    console.log(req.body);


    let { paymentId, orderId, amountOfSeller, amountOfCustomer, billOfSeller, billOfCustomer } = req.body;

    if (!paymentId || !orderId || !amountOfCustomer || !amountOfSeller || !billOfCustomer || !billOfSeller) {

      console.log("all fields are required");
      return next({ status: 400, message: "all fields are required " });

    }

    //type casting 
    amountOfSeller = parseInt(amountOfSeller);
    amountOfCustomer = parseInt(amountOfCustomer);


    // find orderId and paymentId

    let MyPayment;
    try {
      MyPayment = await PaymentService.findPaymentByIdForManger(paymentId);

      console.log(MyPayment);

    } catch (error) {

      console.log(error);

      return next(error);
    }

    let MyOrder;

    try {
      MyOrder = await OrderService.findOrderByIdForManger(orderId);

      console.log(MyOrder);

    } catch (error) {
      console.log(error);
      return next(error);

    }

    // final insert to the databse 

    let PayData = {
      mangerId: manger._id,
      amountOfSeller,
      amountOfCustomer,
      paymentId: MyPayment._id,
      orderId: MyOrder._id,
      billOfCustomer,
      billOfSeller,
    };

    try {
      const result = await MangerAccountPayService.createAccountPayment(PayData);
   

   console.log(result);


      return res.json({ or: true, result:result });


    } catch (error) {

      console.log(error);
      return next(error);

    }




  },
  async findAllAccountPayforManger(req, res, next) {

    const { manger } = req;//{_id:"",activet}

    try {
      const rt = await MangerAccountPayService.findAllAccountpaybymangerid({mangerId:manger._id});
      
      console.log(rt);

      let result=rt.map((i)=>{
        return {
          mangerId:i.mangerId,
          amountOfSeller:i.amountOfSeller,
          amountOfCustomer:i.amountOfCustomer,
          paymentId:i.paymentId,
          orderId:i.orderId,
          billOfCustomer:i.billOfCustomer,
          billOfSeller:i.billOfSeller,
          status:i.status,
          _id:i._id,
        }
      
      });
      return res.json({ or: true, result:result});

    } catch (error) {
      console.log(error);

      return next(error);

    }


  },




};



module.exports = MangerAccountPaymentController;
