
const CustomerProductService = require('../services/cus-product-service');

const CustomerSearchController = {


    async searchForProducts(req, res, next) {


        let { qry } = req.query;//req.query={qry:"opp"}

        //console.log("the value qry is ")

        //console.log(qry);

        if (!qry) {

            //console.log("qry is not provided by user");

            return next({ status: 400, message: "qry is not provided by user" })
        }


        try {

            const result = await CustomerProductService.findBasedOnQry(qry);

            //console.log(result);

            const ProductDto = result.map((i) => {
                return {
                    _id: i._id,
                    name: i.name,
                    brand: i.brand,
                    catergory: i.catergory,
                    mainImage: i.mainImage,
                    mrp: i.mrp,
                    discount: i.discount,
                    spInGst: i.spInGst,
                    deliverTimeId: i.deliverTimeId,
                    deliveryCharge: i.deliveryCharge,

                }
            });//filter link and many thing 

            return res.json({ or: true, result: ProductDto });

        } catch (error) {

            //console.log(error);

            return next(error);

        }

    },

    async findSingleProductById(req, res, next) {

        //console.log("route call find by id ");

        const { id } = req.params;//product/77627468

        //console.log(id);


        if (!id) {

            //console.log("id is not provied by user");

            return next({ status: 400, message: "inavlid product id " });

        }


        try {

            const MyProduct = await CustomerProductService.findProductBasedOnId({ _id: id });


            if (!MyProduct) {

                //console.log("some one alter the in valid id");

                return next({ status: 404, message: "some one alter the in valid id" });

            }

            //console.log(MyProduct);


            const ProductDto = {
                _id: MyProduct._id,
                name: MyProduct.name,
                brand: MyProduct.brand,
                prImages: MyProduct.prImages.map((i) => { return { alt: i.alt, primage: i.primage, _id: i._id } }),
                mrp: MyProduct.mrp,
                discount: MyProduct.discount,
                spInGst: MyProduct.spInGst,
                deliveryCharge: MyProduct.deliveryCharge,
                deliverTimeId: MyProduct.deliverTimeId,
                aboutItem: MyProduct.aboutItem,
                productMap: MyProduct.productMap,
            };

            //console.log(ProductDto);

            return res.json({ or: true, result: ProductDto });


        } catch (error) {

            //console.log(error);

            return next(error);

        }


    },


};


module.exports = CustomerSearchController;
