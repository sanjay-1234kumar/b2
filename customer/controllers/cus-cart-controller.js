
const CustomerCartService = require('../services/cus-cart-service');

const CustomerProductService = require('../services/cus-product-service');

const CustomerCartController = {


    async getAllCartOfUser(req, res, next) {

        //console.log("route call /customer/cart");

        const { customer } = req;

        try {
            const result = await CustomerCartService.getAllCartForCustomer({ customerId: customer._id });

            //console.log(result);

            return res.json({ or: true, result: result });
        } catch (error) {

            //console.log(error);
            return next(error);


        }

    },

    async getSingleItemOfCartById(req, res, next) {

        //console.log(req.params);

        const { customer } = req;

        const { id } = req.params;// id 

        // validtion

        if (!id) {

            // console.log("req.parmas mai id nahi diya gya");

            return next({ status: 400, message: "product id nahi diya gya hai" });
        }


        try {

            const result = await CustomerCartService.findSingleItemOfCartForCustomer({ customerId: customer._id, productId: id });


            //console.log(result);

            return res.json({ or: true, result });

        } catch (error) {

            // console.log(error);

            return next(error);

        }


    },

    async addItemToCustomerCart(req, res, next) {

        //console.log("route call add cutomer item to cart");

        //console.log(req.body);

        const { customer } = req;
        const { productId } = req.body;

        if (!productId) {

            //console.log("product id is not provied customer cart");

            return next({ status: 400, message: "product id is not customer provied by customer" });
        }

        // find customerId,productId already present or not

        let MyCart;

        try {

            MyCart = await CustomerCartService.findCartItemIsAlreadyPresent({ customerId: customer._id, productId: productId });


            if (MyCart) {
                // console data true value iska malta 
                //console.log("this item is alraedy presnrnt in customer cart then there is no opertion perform");
                // return a response 
                return res.json({ or: true, result: MyCart });

            }

            // console.log(MyCart);// null or undefiend value hona chaiye 

        } catch (error) {

            //console.log(error);

            return next(error);

        }

        // find product in the databse then add to cart
        let MyProduct;

        try {
            MyProduct = await CustomerProductService.findProductBasedOnId({ _id: productId });


            if (!MyProduct) {

                // console.log("my product not found in db");

                return next({ status: 400, message: "in valid product id item not added to cart" });
            }

            //console.log(MyProduct);


        } catch (error) {

            //console.log(error);

            return next(error);

        }

        let cartdata = {
            customerId: customer._id,
            productId: MyProduct._id,
            name: MyProduct.name,
            productImage: MyProduct.mainImage,// http//
            baseprice: MyProduct.spInGst,
            basedelivery: MyProduct.deliveryCharge,
            quantity: 1,
            totalamount: MyProduct.spInGst,
            totaldelivery: MyProduct.deliveryCharge,// mrp option bi add kar saket hai

        };

        // final insert in the cart

        try {

            const result = await CustomerCartService.insertSingleItemIntoCart(cartdata);

            //console.log(result);

            return res.json({ or: true, result });

        } catch (error) {

            //console.log(error);

            return next(error);

        }


    },

    async updateCartItemofCustomer(req, res, next) {

        //console.log("route call cart customer update");

        //console.log(req.body);

        const { customer } = req;

        const { productId } = req.body;

        let { quantity } = req.body;

        // valdtion 

        if (!productId || !quantity) {

            //console.log("Productid and quantity nahin bhejagye");

            return next({ status: 400, message: "all feilds are required" });
        }

        //type casting 
        quantity = parseInt(quantity);

        // findoneitemin cart

        let MyItem;

        try {
            MyItem = await CustomerCartService.findCartItemIsAlreadyPresent({ customerId: customer._id, productId: productId });


            if (!MyItem) {
                // myitem nahi mitlat hai
                // console.log("no item found in the cart ");
                //console.log(MyItem);

                return next({ status: 400, message: "no item found in the cart" });

            }

            // console.log(MyItem);

        } catch (error) {

            //console.log(error);

            return next(error);

        }

        let updata = {
            quantity: quantity,
            totalamount: quantity * MyItem.baseprice,
            totaldelivery: quantity * MyItem.basedelivery,
        };
        // item is present then upadate

        let MyUpdateItem;
        try {

            MyUpdateItem = await CustomerCartService.updatecartItembyquantiy({ customerId: customer._id, productId: productId }, updata);

            // console.log("item update done successfully");

            //console.log(MyUpdateItem);


        } catch (error) {

            //console.log(error);

            return next(error);

        }

        try {

            const myresult = await CustomerCartService.getAllCartForCustomer({ customerId: customer._id });

            // console.log(myresult);

            return res.json({ or: true, result: myresult });

        } catch (error) {

            //console.log(error);

            return next(error);

        }



    },

    async deleteCartofCustomer(req, res, next) {

        //console.log("cart item delete route call");

        //console.log(req.body);

        const { customer } = req;
        const { productId } = req.body;

        // valdtion 

        if (!productId) {

            // console.log("Product id nahi diya gye");
            return next({ status: 400, message: "all feilds are required" });

        }


        let MyItem;

        try {

            MyItem = await CustomerCartService.findCartItemIsAlreadyPresent({ customerId: customer._id, productId: productId });

            if (!MyItem) {

                return next({ status: 400, message: "item in sin not found in the cart" });

            }

        } catch (error) {

            // console.log(error);

            return next(error);
        }

        try {
            const result = await CustomerCartService.deleteCartItemsofcustomer({ customerId: customer._id, productId: productId });

            //console.log(result);

            //console.log("item is delete successfully from cart");

        } catch (error) {

            //console.log(error);

            return next(error);
        }

        //find all doc

        try {
            const myresult = await CustomerCartService.getAllCartForCustomer({ customerId: customer._id });

            //console.log(myresult);

            return res.json({ or: true, result: myresult });

        } catch (error) {

            //console.log(error);

            return next(error);
        }

    },

    async findSingleInItemForCheck(req, res, next) {

        //console.log("check item in customer cart ");

        const { customer } = req;//{_id:"",role:""}

        const { cusPrId } = req.params;

        //console.log(req.params);

        if (!cusPrId) {

            //console.log("product id is not send from by customer");

            return next({ status: 400, message: "product id is not send from by customer" });

        }

        //check in customer cart 

        try {
            const result = await CustomerCartService.findCartItemIsAlreadyPresent({ customerId: customer._id, productId: cusPrId });

            //console.log(result);


            if (result) {

                return res.json({ or: true, message: "item is present on the cart " });

            } else {

                return res.json({ or: false, message: "item is not present in the cart" });

            }

        } catch (error) {

           // console.log(error);
           
            return next(error);
        }




    },



};


module.exports = CustomerCartController;
