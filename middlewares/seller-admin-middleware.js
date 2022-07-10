
function sellerAdminRole(req, res, next) {

    const { role } = req.seller;//

    if (role === 'adminseller') {

        return next();

    } else {
        return next({ status: 400, message: "ununthasier admin seller is not admin" });

    }


}



module.exports = sellerAdminRole;
