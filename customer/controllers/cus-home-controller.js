
const CatergoryModel = require('../../models/seller-catergory-model');


const ProductModel = require('../../models/seller-product-model');


const SubCatergoryModel = require('../../models/seller-subcatergory-model');


const CustomerHomeController = {


    async getTopCatergory(req, res, next) {


        try {
            const result = await CatergoryModel.find().sort({ name: 1 }).limit(4);

            //console.log(result);

            const catergoryDto = result.map((i) => {

                return {
                    _id: i._id,
                    name: i.name,
                    catergoryimage: i.catergoryimage,

                }
            });


            return res.json({ or: true, result: catergoryDto });

        } catch (error) {

            //console.log(error);

            return next(error);
        }

    },

    async findTopProductsForHome(req, res, next) {

        try {

            const result = await ProductModel.find({status:true}).sort({ brating: -1 }).limit(4);

            //console.log(result);

            const ProductDto = result.map((i) => {

                return (
                    {
                        _id: i._id,
                        name: i.name,
                        brand: i.brand,
                        catergory: i.catergory,
                        mainImage: i.mainImage,
                        mrp: i.mrp,
                        discount: i.discount,
                        spInGst: i.spInGst,
                        deliveryCharge: i.deliveryCharge,

                    }
                )
            });



            return res.json({ or: true, result: ProductDto })


        } catch (error) {

            //console.log(error);

            return next(error);

        }


    },
    async findAllSubCatergoryByParent(req, res, next) {


        const { id } = req.params;

        //console.log(req.params);


        if (!id) {

            return next({ status: 400, message: "invalid parent id" });

        }

        try {


            const result = await SubCatergoryModel.find({ parent: id }).sort({ name: 1 });

            //console.log(result);

            const SubactergoryDto = result.map((i) => {

                return {
                    _id: i._id,
                    name: i.name,
                    subcatergoryimage: i.subcatergoryimage,
                    parent: i.parent,
                }
            });


            return res.json({ or: true, result: SubactergoryDto });



        } catch (error) {

            //console.log(error);

            return next(error);

        }

    },
    async findProductsbySubCatergory(req, res, next) {


        const { id } = req.params;

        //console.log(req.params);

        if (!id) {

            return next({ status: 400, message: "invalid parent id" });

        }


        try {

            const result = await ProductModel.find({ catergory: id ,status:true}).populate('deliverTimeId');

            // console.log(result);

            const ProductDto = result.map((i) => {

                return (
                    {
                        _id: i._id,
                        name: i.name,
                        brand: i.brand,
                        catergory: i.catergory,
                        mainImage: i.mainImage,
                        mrp: i.mrp,
                        discount: i.discount,
                        spInGst: i.spInGst,
                        deliveryCharge: i.deliveryCharge,
                        deliverTimeId: i.deliverTimeId,

                    }
                )
            });



            return res.json({ or: true, result: ProductDto })



        } catch (error) {

            //console.log(error);

            return next(error);

        }

    },

    async findallshopbycatergory(req, res, next) {

        //all catergory

        try {
            
            const result = await CatergoryModel.find().sort({ name: 1 });

            //console.log(result);

            const catergoryDto = result.map((i) => {

                return {
                    _id: i._id,
                    name: i.name,
                    catergoryimage: i.catergoryimage,

                }
            });


            return res.json({ or: true, result: catergoryDto });

        } catch (error) {

            //console.log(error);

            return next(error);
        }


    },


};




module.exports = CustomerHomeController;
