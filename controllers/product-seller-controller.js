

const calEverything = require('../services/product/cal-service');

const SellerTaxService = require('../services/product/tax-service');

const SellerSubCatergoryService = require('../services/product/subcatergory-service');

const SellerService = require('../services/seller-service');

const SellerProductService = require('../services/product/seller-product-service');


const SellerProductController = {

    async createSingleProduct(req, res, next) {

        //console.log(req.body);

        const { seller } = req;// sellerId

        let {
            primage, name, des, inStock,
            brand, catergory, tax, mrp, sellerP, customerP, parmentSeller, actualDeliveryCharge,
            aboutItem, productMap, mymainImage
        } = req.body;// images ka array banna hai

        //valdtion code 

        if (!name || !des || !brand || !catergory || !tax || !mrp || !sellerP || !customerP || !parmentSeller) {

            //console.log("all feilds are requird");

            return next({ status: 400, message: "valdition error for product route" });

        }

        // console.log(aboutItem);

        //console.log(productMap);

        let AboutObj = JSON.parse(aboutItem);

        let ProductMapObj = JSON.parse(productMap);

        //console.log(AboutObj);

        //console.log(ProductMapObj);

        let AboutAr = AboutObj.map((i) => {

            return ({ des: i });
        })//[{des:"ss"},{des:"ss"}]

        let ProductMapAr = ProductMapObj.map((i) => {
            return {
                mykey: i.mykey,
                myvalue: i.myvalue,
            }
        });//[{mykey:"s",myvalue:"ss"}]


        //console.log(AboutAr);

        // console.log(ProductMapAr);


        // parse init code 

        name = name.toLowerCase();// name
        brand = brand.toLowerCase();//brand
        des = des.toLowerCase();
        inStock = parseInt(inStock);
        actualDeliveryCharge = parseInt(actualDeliveryCharge);
        sellerP = parseInt(sellerP);//number
        customerP = parseInt(customerP);//number
        mrp = parseInt(mrp);//number


        // find catergory and tax on database 

        let MyTax;// tax

        try {
            MyTax = await SellerTaxService.findSingleTaxForProduct({ name: tax });

            if (!MyTax) {

                //console.log("tax not found class for produtc");

                return next({ status: 400, message: "tax not found class for produtc" });
            }

            // console.log(MyTax);

        } catch (error) {

            //console.log(error);

            return next(error);
        }


        let MySubCater;// cater

        try {

            MySubCater = await SellerSubCatergoryService.findSingleSubCaterForProduct({ name: catergory });

            if (!MySubCater) {

                // console.log("sub cater not found db for product");

                return next({ status: 400, message: "sub cater not found db for product" });

            }

            //console.log(MySubCater);


        } catch (error) {

            //console.log(error);

            return next(error);
        }

        let MyParSeller;// for seller 

        try {

            MyParSeller = await SellerService.findSeller({ _id: parmentSeller });

            if (!MyParSeller) {

                //console.log("parement seller not found in the databse");

                return next({ status: 400, message: "parement seller not found in databse" });

            }

            //console.log(MyParSeller);


        } catch (error) {

            //console.log(error);

            return next(error);

        }
        // images of is 
        let prImages = primage.map((i) => {

            const data = {
                alt: name.toLowerCase(),
                primage: i.output
            };

            return data;
        });

        //console.log(prImages);

        // call everything function to an object

        const TestObj = calEverything(sellerP, customerP, MyTax.rate, mrp);

        // console.log(TestObj);

        // then final create product data


        const finalProductdata = {
            name: name,
            brand: brand,
            prImages: prImages,
            mainImage: mymainImage,
            catergory: MySubCater._id,
            tax: MyTax._id,
            des: des,
            inStock: inStock,
            actualDeliveryCharge: actualDeliveryCharge,
            sellerId: seller._id,
            parmentSeller: MyParSeller._id,
            mrp: TestObj.mrp,
            discount: TestObj.discount,
            spExGst: TestObj.spExGst,//customerexculding gst
            spInGst: TestObj.spInGst,//customer in cluding gst
            spExGstForS: TestObj.spExGstForS,//seller exulding gst
            spInGstForS: TestObj.spInGstForS,//seller including gst
            grossProfitForS: TestObj.grossProfitForS,
            netProfitForS: TestObj.netProfitForS,
            grossProfitMarginForS: TestObj.grossProfitMarginForS,
            netProfitMarginForS: TestObj.netProfitMarginForS,
            aboutItem: AboutAr,
            productMap: ProductMapAr,
        };

        // final create a product 

        // console.log(finalProductdata);

        try {

            const prresult = await SellerProductService.createSingleProductFromSeller(finalProductdata);

            //console.log(prresult);

            return res.json({ or: true, result: prresult });

        } catch (error) {

            // console.log(error);

            return next(error);

        }

    },

    async findAllProductsforSeller(req, res, next) {

        try {



            const result = await SellerProductService.findAllProductWithDetailsForSeller();


            //console.log(result);


            let ProductDto = result.map((i) => {

                return {
                    _id: i._id,
                    name: i.name,
                    brand: i.brand,
                    status: i.status,
                    prImages: i.prImages,
                    mainImage: i.mainImage,
                    catergory: i.catergory,
                    tax: i.tax,
                    des: i.des,
                    mrp: i.mrp,
                    discount: i.discount,
                    spExGst: i.spExGst,
                    spInGst: i.spInGst,
                    sellerId: i.sellerId,
                    parmentSeller: i.parmentSeller,
                    spExGstForS: i.spExGstForS,
                    spInGstForS: i.spInGstForS,
                    grossProfitForS: i.grossProfitForS,
                    netProfitForS: i.netProfitForS,
                    grossProfitMarginForS: i.grossProfitMarginForS,
                    netProfitMarginForS: i.netProfitMarginForS,
                    inStock: i.inStock,
                    deliveryCharge: i.deliveryCharge,
                    actualDeliveryCharge: i.actualDeliveryCharge,
                    deliverTimeId: i.deliverTimeId,
                    createdAt: i.createdAt
                }
            });





            return res.json({ or: true, result: ProductDto });


        } catch (error) {

            // console.log(error);

            return next(error);

        }

    },

    async getdataoftaxsubcatergoryforaddProduct(req, res, next) {

        //console.log("route call getting data of tax and subcatergor");

        let subcatergory = [];

        let tax = [];

        //find tax 

        try {
            tax = await SellerTaxService.findAllTaxlistarrayforaddProduct();

            //console.log(tax);

        } catch (error) {

            //console.log(error);

            return next(error);
        }

        //find list of subactergory

        try {

            subcatergory = await SellerSubCatergoryService.findAllSubcatergoryforaddProduct();

            //console.log(subcatergory);

            return res.json({ or: true, result: { tax, subcatergory } });

        } catch (error) {

            //console.log(error);

            return next(error);
        }


    },

    async findSingleProductbyId(req, res, next) {

        //console.log(req.params);

        const { id } = req.params;

        if (!id) {

            //console.log("all id reaquedd");

            return next({ status: 400, message: "valdition error for product route" });
        }

        //find by 
        try {
            const result = await SellerProductService.findbyidwithdetails(id);

            // console.log(result);

            let singleProductDto = {
                _id: result._id,
                name: result.name,
                brand: result.brand,
                status: result.status,
                prImages: result.prImages.map((i) => {
                    return {
                        _id: i._id,
                        alt: i.alt,
                        primage: i.primage,
                    }
                }),
                mainImage: result.mainImage,
                catergory: result.catergory,
                tax: result.tax,
                des: result.des,
                mrp: result.mrp,
                discount: result.discount,
                spExGst: result.spExGst,
                spInGst: result.spInGst,
                sellerId: result.sellerId,
                parmentSeller: result.parmentSeller,
                spExGstForS: result.spExGstForS,
                spInGstForS: result.spInGstForS,
                grossProfitForS: result.grossProfitForS,
                netProfitForS: result.netProfitForS,
                grossProfitMarginForS: result.grossProfitMarginForS,
                netProfitMarginForS: result.netProfitMarginForS,
                inStock: result.inStock,
                deliveryCharge: result.deliveryCharge,
                actualDeliveryCharge: result.actualDeliveryCharge,
                deliverTimeId: result.deliverTimeId,
                createdAt: result.createdAt,
                aboutItem: result.aboutItem,
                productMap: result.productMap,

            }


            return res.json({ or: true, result: singleProductDto });

        } catch (error) {

            //console.log(error);

            return next(error);
        }

    },
    async getdataforeditofproductbyid(req, res, next) {

        //console.log(req.params);

        const { id } = req.params;

        if (!id) {

            // console.log("all id reaquedd");

            return next({ status: 400, message: "valdition error for product route" });
        }
        //find by 

        try {
            const result = await SellerProductService.findbyidforeditdatawithdetials(id);

            // console.log(result);

            return res.json({ or: true, result });

        } catch (error) {

            //console.log(error);


            return next(error);
        }


    },

    async updateProductbyId(req, res, next) {

        // console.log(req.body);

        const { id } = req.body;

        if (!id) {

            // console.log("all id reaquedd");

            return next({ status: 400, message: "valdition error for product route" });
        }


        let { name, mrp, des, inStock, actualDeliveryCharge, status, customerP, sellerP } = req.body;


        if (!name || !des) {

            //console.log("all feilds are requird");
            return next({ status: 400, message: "valdition error for product route" });

        }

        //type casting

        name = name.toLowerCase();// name
        des = des.toLowerCase();
        inStock = parseInt(inStock);
        actualDeliveryCharge = parseInt(actualDeliveryCharge);
        sellerP = parseInt(sellerP);//number
        customerP = parseInt(customerP);//number
        mrp = parseInt(mrp);//number

        //find by id for tax details 
        let MyProduct;
        try {
            MyProduct = await SellerProductService.findProductByidforupdateofproduct(id);

            if (!MyProduct) {

                //console.log("invalid product id ");

                return next({ status: 400, message: "invalid product id" });
            }

            //console.log(MyProduct);

        } catch (error) {

            //console.log(error);

            return next(error);
        }

        //find tax

        let MyTax;

        try {

            MyTax = await SellerTaxService.findtaxbyidforproductupdate(MyProduct.tax);

            //console.log(MyTax);


        } catch (error) {

            //console.log(error);

            return next(error);
        }

        //call cal service take data 

        const TestObj = calEverything(sellerP, customerP, MyTax.rate, mrp);


        //console.log(TestObj);
        // then final create product data


        const finalProductdata = {
            name: name,
            des: des,
            inStock: inStock,
            actualDeliveryCharge: actualDeliveryCharge,
            mrp: TestObj.mrp,
            discount: TestObj.discount,
            spExGst: TestObj.spExGst,//customerexculding gst
            spInGst: TestObj.spInGst,//customer in cluding gst
            spExGstForS: TestObj.spExGstForS,//seller exulding gst
            spInGstForS: TestObj.spInGstForS,//seller including gst
            grossProfitForS: TestObj.grossProfitForS,
            netProfitForS: TestObj.netProfitForS,
            grossProfitMarginForS: TestObj.grossProfitMarginForS,
            netProfitMarginForS: TestObj.netProfitMarginForS,
            status: status,//true or false
        };

        // final create a product 

        //console.log(finalProductdata);

        try {
            const myresult = await SellerProductService.updateProductbyprId(id, finalProductdata);

            //console.log(myresult);

            //console.log("product update suceesflly ");

            return res.json({ or: true, result: myresult });

        } catch (error) {

            //console.log(error);

            return next(error);

        }

    },

    async findProductbySearchId(req, res, next) {

        //console.log(req.query);

        const { id } = req.query;

        if (!id) {

            //console.log("all id reaquedd");

            return next({ status: 400, message: "valdition error for product route" });
        }

        //find array of 

        try {
            const result = await SellerProductService.findProductforsearch({ _id: id })

            //console.log(result);

            let ProductDto = result.map((i) => {

                return {
                    _id: i._id,
                    name: i.name,
                    brand: i.brand,
                    status: i.status,
                    prImages: i.prImages,
                    mainImage: i.mainImage,
                    catergory: i.catergory,
                    tax: i.tax,
                    des: i.des,
                    mrp: i.mrp,
                    discount: i.discount,
                    spExGst: i.spExGst,
                    spInGst: i.spInGst,
                    sellerId: i.sellerId,
                    parmentSeller: i.parmentSeller,
                    spExGstForS: i.spExGstForS,
                    spInGstForS: i.spInGstForS,
                    grossProfitForS: i.grossProfitForS,
                    netProfitForS: i.netProfitForS,
                    grossProfitMarginForS: i.grossProfitMarginForS,
                    netProfitMarginForS: i.netProfitMarginForS,
                    inStock: i.inStock,
                    deliveryCharge: i.deliveryCharge,
                    actualDeliveryCharge: i.actualDeliveryCharge,
                    deliverTimeId: i.deliverTimeId,
                    createdAt: i.createdAt
                }
            });

            return res.json({ or: true, result: ProductDto });

        } catch (error) {

            //console.log(error);

            return next(error);
        }
    },

};



module.exports = SellerProductController;
