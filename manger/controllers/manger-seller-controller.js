
const SellerService = require('../../services/seller-service');


const MangerSellerController = {


    async findSellers(req, res, next) {
        // auth 

        const { manger } = req;//{_id:"101",role:""}mangerId

        try {
            const MySeller = await SellerService.findSellersForManger({ mangerId: manger._id });

            console.log(MySeller);

            return res.json({ sr: true, MySeller });

        } catch (error) {

            console.log(error);
            return next(error);

        }


    },


};






module.exports = MangerSellerController;
