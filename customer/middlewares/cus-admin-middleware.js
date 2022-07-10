


function customerAdminRoleMiddlewre(req, res, next) {

    const { customer } = req;//

    if (customer.role === 'admin') {

        return next();

    } else {

        return next({ status: 400, message: "your are not a admin" })
    }

}




module.exports = customerAdminRoleMiddlewre;
