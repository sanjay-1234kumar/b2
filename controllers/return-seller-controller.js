

const SellerReturnService = require('../services/product/seller-return-service');

const SellerReturnController = {

  async findAllReturnForSeller(req, res, next) {

    const { seller } = req;

    try {

      const result = await SellerReturnService.findAllReturnFromSellerById({ sellerId: seller._id });//sellerId:
      
      //console.log(result);

      const retDto = result.map((i) => {
        return ({
          _id: i._id,
          name: i.name,
          amount: i.amount,
          retStatus: i.retStatus,
          retImage: i.retImage,
          billImage: i.billImage,
          sellerId: i.sellerId,
          orderId: {
            _id:i.orderId._id,
            totalAmountofOrder:i.orderId.totalAmountofOrder,
            status:i.orderId.status,
          },
         
          createdAt: i.createdAt,
        });
      });

      //console.log(retDto);

      return res.json({ or: true, result: retDto });

    } catch (error) {

     // console.log(error);

      return next(error);

    }
  },

  async findSingleReturnforseller(req, res, next) {

   // console.log(req.params);

    const { id } = req.params;

    if (!id) {

     // console.log("validtion error");

      return next({ status: 400, message: "validtion error id is not provded by user" });


    }

    //find by id 

    try {

      const result = await SellerReturnService.findsingleretunrbyidwithdetials(id);

      //console.log(result);

      const retDto = {

        _id: result._id,
        name: result.name,
        amount: result.amount,
        retStatus: result.retStatus,
        retImage: result.retImage,
        billImage: result.billImage,
        sellerId: result.sellerId,
        orderId: {
          _id:result.orderId._id,
          totalAmountofOrder:result.orderId.totalAmountofOrder,
          status:result.orderId.status,
        },
       
        createdAt: result.createdAt,

      }


      return res.json({ or: true, result: retDto });

    } catch (error) {

      //console.log(error);

      return next(error);
    }


  },
  async getdataofreturnforedit(req, res, next) {


    //console.log(req.params);

    const { id } = req.params;

    if (!id) {

     // console.log("validtion error");

      return next({ status: 400, message: "validtion error id is not provded by user" });

    }

    //find by id 

    try {

      const result = await SellerReturnService.findbyidforedit(id);

      //console.log(result);

      const retDto = {

        _id: result._id,
        name: result.name,
        amount: result.amount,
        retStatus: result.retStatus,
        retImage: result.retImage,
        billImage: result.billImage,
        sellerId: result.sellerId,
         orderId: {
          _id:result.orderId._id,
          totalAmountofOrder:result.orderId.totalAmountofOrder,
          status:result.orderId.status,
        },
        
        createdAt: result.createdAt,

      };

      return res.json({ or: true, result: retDto });

    } catch (error) {

      //console.log(error);

      return next(error);
    }

  },

  async updateRetunrStatus(req, res, next) {

    //console.log(req.body);

    const { id, retStatus } = req.body;

    if (!id || !retStatus) {

      //console.log("validation error");

      return next({ status: 400, message: "all feilds are required for update returns" });

    }

    let mydata = {
      retStatus,
    };
    //find id and uadate 

    try {

      const result = await SellerReturnService.updatereturnbyid(id, mydata);

      //console.log(result);

      return res.json({ or: true, result });


    } catch (error) {

      //console.log(error);
      
      return next(error);
    }


  },





};






module.exports = SellerReturnController;
