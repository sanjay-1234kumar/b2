
const CustomerProductService = require('../services/cus-product-service');

const CustomerCookieContoller = {

    async createCookie(req, res, next) {

        //console.log("cookie route initai cookie call");

        const { cart } = req.cookies;//


        if (!cart) {

            //console.log("cookie is not set in sever");

            const ar = [];

            res.cookie('cart', ar, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true,
            });
        }

        // console.log("we succesfully intial cookies");

        return res.json("cookie is set");

    },

    async getCookiecart(req, res, next) {

        // console.log('route call get all cart items of cookie');

        const { cart } = req.cookies;

        if (!cart) {

            //console.log("cart cookie not found ");

            return next({ status: 400, message: "cart cookie has been expired" });
        }

        //console.log(cart);

        return res.json({ or: true, result: cart });

    },
    async addItemCookieCartbyId(req, res, next) {

        //console.log("add to cookie cart produt route")
        // console.log(req.body);
        // valdition
        let CokCart = [];
        const { productId } = req.body;//101pr

        if (!productId) {

            //console.log("product id is not provied cookie cart");

            return next({ status: 400, message: "product id is not customer provied by customer" });
        }

        const { cart } = req.cookies;//cart



        if (!cart) {

            return next({ status: 400, message: "cart cookie is not set" });
        }

        // console.log("the value cookie cart is  ");
        // console.log(cart);

        CokCart = cart;// copy kar rehe hai 


        // find productid is presnt or in cart 
        const pr = CokCart.find((i) => {

            if (i.productId === productId) {

                return true;
            } else {
                return false;
            }

        });// return if element is not present undefiend nah 

        // check alreday presnt 
        if (pr) {

            // console.log("item is alreday presnt in the cart so no opertion we return a direct responese ");
            return res.json({ or: true, result: { message: "item is alreday present in the cart direct no operation " } });


        }


        // find product in the databse then add to cart
        let MyProduct;

        try {

            MyProduct = await CustomerProductService.findProductBasedOnId({ _id: productId });

            if (!MyProduct) {

                //console.log("my product not found in db");

                return next({ status: 400, message: "in valid product id" });
            }


            // unshift 

            CokCart.unshift({
                productId: MyProduct._id,
                name: MyProduct.name,
                productImage: MyProduct.mainImage,
                baseprice: MyProduct.spInGst,
                basedelivery: MyProduct.deliveryCharge,
                quantity: 1,
                totalamount: MyProduct.spInGst,
                totaldelivery: MyProduct.deliveryCharge,
            });

            //console.log("final array is cookie after addition ");
            //console.log(CokCart);

            res.cookie('cart', CokCart, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true,
            });

            return res.json({ or: true, result: { message: "item is successfully added to cookie cart" } });


        } catch (error) {

            //console.log(error);

            return next(error);
        }

    },

    async upadtaeCookieCartById(req, res, next) {

        //console.log("update cookie item route call ");

        //console.log(req.body);


        const { cart } = req.cookies;

        let MyCart = [];


        if (!cart) {

            //console.log("cart cookie not found ");

            return next({ status: 400, message: "cart cookie not found" });
        }

        let { productId, quantity } = req.body;

        if (!productId || !quantity) {

            //console.log("validtion error for updating cart");

            return next({ status: 400, message: "valdion error for cookie cart" });
        }

        // type cast quatnity into number;

        quantity = parseInt(quantity);

        MyCart = cart;


        //find based on index

        const pr = MyCart.findIndex((i) => {

            if (i.productId === productId) {
                return true;
            } else {
                return false;
            }
        });

        // check 

        if (pr === -1) {

            //console.log("element not found in cart index");

            return next({ status: 400, message: "element not present in cart" })
        }

        //console.log(pr);// index

        const old = MyCart[pr];//0
        // purna data hai mere pass

        MyCart[pr].quantity = quantity;// update qutanity

        MyCart[pr].totalamount = quantity * old.baseprice;

        MyCart[pr].totaldelivery = quantity * old.basedelivery;

        //console.log(MyCart[pr]);

        res.cookie('cart', MyCart, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });

        // console.log("updated cart is ");
        // console.log(MyCart);

        return res.json({ or: true, result: MyCart });

    },

    async deleteCartCookieById(req, res, next) {

        //console.log("delete cookie item route call")
        //console.log(req.body);

        const { cart } = req.cookies;

        let MyCart = [];

        if (!cart) {

            //console.log("cart cookie not found ");

            return next({ status: 400, message: "cart cookie not found" });
        }


        const { productId } = req.body;

        if (!productId) {

            //console.log("validtion error for updating cart");

            return next({ status: 400, message: "valdion error for cookie cart" });
        }

        MyCart = cart;

        // check it is presnt or not

        const pr = MyCart.find((i) => {

            if (i.productId === productId) {

                return true;
            } else {
                return false;
            }
        });// return unidefiend 

        if (!pr) {

            //console.log("item is not present in cart we can not delete");

            return next({ status: 400, message: "item is not present in cart we can not delete" });
        }

        // then is presnet

        let FilCart = MyCart.filter((i) => {

            if (i.productId === productId) {
                return false;
            } else {
                return true;
            }
        });

        //console.log("final cart  after deletion operation ");


        //console.log(FilCart);

        res.cookie('cart', FilCart, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });

        return res.json({ or: true, result: FilCart });

    },

    async checkItemIsPresentInCookieCart(req, res, next) {

        //console.log("route call ckeck item by produt id ");

        let MyCookie = [];

        //console.log(req.params);

        const { prId } = req.params;

        const { cart } = req.cookies;


        if (!prId) {

            //console.log("product id is not provided for checking cart cookie");

            return next({ status: 400, message: "product id is not provided for checking cart cookie" })
        }

        if (!cart) {

            //console.log("cart cookie is not set ");

            return next({ status: 400, message: "cart cookie is not set" });
        }

        //cehck item is present in 
        MyCookie = cart;//MyCookie

        const result = MyCookie.find((i) => {
            if (i.productId === prId) {
                return true;
            } else {
                return false;
            }
        });

        //console.log("the result of check item cookie cart ");

        //console.log(result);

        if (result) {

            return res.json({ or: true, result: { message: "item is present in the cookie cart" } });
        } else {

            return res.json({ or: false, result: { message: "item is not  present in the cookie cart" } });
        }

    },

};



module.exports = CustomerCookieContoller;