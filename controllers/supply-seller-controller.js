
const SellerProductService = require('../services/product/seller-product-service');

const SellerService = require('../services/seller-service');

const SellerSupplyService = require('../services/product/seller-supply-service');

const SellerAlertService = require('../services/alert-service');


const SellerSupplyController = {


    async createSingleSupplyMap(req, res, next) {
        // productid sellerid price instock 
        // req.seller={_id:"",role:"",activated:""}
        //console.log(req.body);

        const { seller, mangerId } = req;//seller mangerId='wew'
        let { productId, price, inStock } = req.body;

        // validation of supply

        if (!productId || !price || !inStock) {

            //console.log("valditoin error in map");

            return next({ status: 400, message: "all feilds are required" });
        }

        // conversion
        price = parseInt(price);
        inStock = parseInt(inStock);

        // find product in database 
        let MyProduct;

        try {
            MyProduct = await SellerProductService.findProductWithIdForMap({ _id: productId });

            if (!MyProduct) {

                //console.log("myproduct not found in db");

                return next({ status: 400, message: "product is not found in databse" });

            }

            //console.log(MyProduct);

        } catch (error) {

            //console.log(error);

            return next(error);
        }

        // find seller in databse auth middleware 

        //check this product id is already create or not 

        try {

            const existofP = await SellerSupplyService.findProdutcAlreadyExist({ productId: productId, sellerId: seller._id });

            //console.log("result of already exist map ");

            //console.log(existofP);

            if (existofP) {

                // console.log("map is already created product id ");

                return next({ status: 400, message: "map is already created product id" });

            }

        } catch (error) {

            //console.log(error);

            return next(error);
        }

        // final create a supplier map

        try {

            const data = {
                productId: MyProduct._id,
                sellerId: seller._id,
                price,
                inStock,
                mangerId,
            };
            const result = await SellerSupplyService.createSingleSupplyMapForSeller(data);

            //console.log(result);

            return res.json({ or: true, result });

        } catch (error) {

            //console.log(error);

            return next(error);
        }

    },
    async findSupplyMapForeachSeller(req, res, next) {

        const { seller } = req;

        try {
            const result = await SellerSupplyService.findSupplyMapForSeller({ sellerId: seller._id });

            //console.log(result);


            let SupplyDto = result.map((i) => {

                return {
                    _id: i._id,
                    status: i.status,
                    price: i.price,
                    inStock: i.inStock,
                    productId: {
                        _id: i.productId._id,
                        name: i.productId.name,
                        status: i.productId.status,
                        mainImage: i.productId.mainImage,
                        mrp: i.productId.mrp,
                        spInGst: i.productId.spInGst,
                    },
                    createdAt: i.createdAt,

                }
            });

            //console.log(SupplyDto);


            return res.json({ or: true, result: SupplyDto });

        } catch (error) {

            //console.log(error);

            return next(error);
        }
    },

    async findSingleItembyId(req, res, next) {

        // console.log(req.params);

        const { id } = req.params;

        if (!id) {

            // console.log("id is not provided by seller");

            return next({ status: 400, message: "id is not provided by seller" });

        }

        try {

            const result = await SellerSupplyService.findMapbyid(id);

            //console.log(result);

            let SingleSupplyDto = {
                _id: result._id,
                status: result.status,
                price: result.price,
                inStock: result.inStock,
                productId: {
                    _id: result.productId._id,
                    name: result.productId.name,
                    status: result.productId.status,
                    mainImage: result.productId.mainImage,
                    mrp: result.productId.mrp,
                    spInGst: result.productId.spInGst,
                },
                createdAt: result.createdAt,
            };


            //console.log(SingleSupplyDto);

            return res.json({ or: true, result: SingleSupplyDto });

        } catch (error) {

            //console.log(error);

            return next(error);
        }

    },


    async getSupplydataforedit(req, res, next) {

        //console.log(req.params);

        const { id } = req.params;

        if (!id) {

            //console.log("id is not provided by seller");

            return next({ status: 400, message: "id is not provided by seller" });

        }
        //find by id 
        try {

            const result = await SellerSupplyService.findbyidforeditdata(id);

            //console.log(result);

            let SingleSupplyDto = {
                _id: result._id,
                status: result.status,
                price: result.price,
                inStock: result.inStock,
                productId: {
                    _id: result.productId._id,
                    name: result.productId.name,
                    status: result.productId.status,
                    mainImage: result.productId.mainImage,
                    mrp: result.productId.mrp,
                    spInGst: result.productId.spInGst,
                },
            };

            //console.log(SingleSupplyDto);


            return res.json({ or: true, result: SingleSupplyDto });

        } catch (error) {

            // console.log(error);

            return next(error);
        }

    },

    async updateSellerSupply(req, res, next) {


        const { seller } = req;

        // console.log(req.body);

        const { id } = req.body;

        if (!id) {

            // console.log("id is not provided by seller");

            return next({ status: 400, message: "id is not provided by seller" });
        }

        let { price, inStock, status } = req.body;


        if (!price) {

            //console.log("valditoin error in map");

            return next({ status: 400, message: "all feilds are required" });
        }

        // conversion
        price = parseInt(price);
        inStock = parseInt(inStock);


        //find supply id 
        let mySupply;

        try {

            mySupply = await SellerSupplyService.findSupplyForCheckProductId(id);

            //console.log(mySupply);

        } catch (error) {

            // console.log(error);

            return next(error);

        }


        let myPr;//let product 
        //create an productId and sellerId are equal

        try {

            myPr = await SellerProductService.findSingleProductforAlert({ parmentSeller: seller._id, _id: mySupply.productId });

            //console.log("result of pind it is perement seller or not ");

            //console.log(myPr);//then push a alert

            if (myPr) {

                //console.log("myproduct is prement seller ");

                try {

                    let alrt = await SellerAlertService.createSingleAlertfromMap({
                        sellerId: seller._id,
                        productId: mySupply.productId,
                        supplyId: mySupply._id

                    });

                    //console.log(alrt);

                    //console.log("new alert is created");

                } catch (error) {

                    // console.log(error);

                    return next(error);
                }
            } else {

                //console.log("no product found of perement seller it is not perment seller of this product  ");
            }

        } catch (error) {

            // console.log(error);

            return next(error);

        }


        let mydata = {
            status,
            price,
            inStock
        };

        try {

            const result = await SellerSupplyService.updatesupplybyid(id, mydata);

            //console.log(result);

            return res.json({ or: true, result });

        } catch (error) {

            //console.log(error);

            return next(error);
        }

        //push alert to admin check roductid and seller id  
    },

    async findSupplyByProductId(req, res, next) {

        const { seller } = req;

        //console.log(req.query);

        const { productId } = req.query;


        if (!productId) {

            //console.log("valditoin error in map");

            return next({ status: 400, message: "all feilds are required" });
        }

        try {

            const result = await SellerSupplyService.findSupplyBasedonProductid({ productId: productId, sellerId: seller._id });

            //return a array 
            //console.log(result);


            let SupplyDto = result.map((i) => {

                return {
                    _id: i._id,
                    status: i.status,
                    price: i.price,
                    inStock: i.inStock,
                    productId: {
                        _id: i.productId._id,
                        name: i.productId.name,
                        status: i.productId.status,
                        mainImage: i.productId.mainImage,
                        mrp: i.productId.mrp,
                        spInGst: i.productId.spInGst,
                    },

                }
            });

            //console.log(SupplyDto);

            return res.json({ or: true, result: SupplyDto });

        } catch (error) {

            //console.log(error);

            return next(error);
        }
    },

};







module.exports = SellerSupplyController;
