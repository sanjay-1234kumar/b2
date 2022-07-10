
const CustomerCartModel = require('../../models/customer-cart-model');


const CustomerCartService = {

    async getAllCartForCustomer(filter) {

        return await CustomerCartModel.find(filter);// customerId


    },
    async insertManyItemsFromCookieToCart(data) {
        
        return await CustomerCartModel.insertMany(data);


    },
    async findMultipleProductsInCartForOrder(customerId, products) {

        return await CustomerCartModel.find({ customerId: customerId, productId: { $in: products } });


    },
    async findMultipleproductCartfordeleteforOrder(customerId, products) {

        return await CustomerCartModel.deleteMany({ customerId: customerId, productId: { $in: products } });

    },

    async findCartItemIsAlreadyPresent(filter){

        return await CustomerCartModel.findOne(filter);


    },

    async insertSingleItemIntoCart(data){

        return await CustomerCartModel.create(data);
        
    },

    async updatecartItembyquantiy(filter,data){

        return await CustomerCartModel.findOneAndUpdate(filter,data);
    },
    async deleteCartItemsofcustomer(filter){

        return await CustomerCartModel.deleteOne(filter);
        
        
    },

    async findSingleItemOfCartForCustomer(filter){

        return await CustomerCartModel.find(filter);//[of one item]


    },
   




};





module.exports = CustomerCartService;