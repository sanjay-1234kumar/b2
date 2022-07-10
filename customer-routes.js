
const router = require('express').Router();

const CustomerAuthController = require('./customer/controllers/cus-auth-controller');

const CustomerAuthMiddleware = require('./customer/middlewares/cus-auth-middleware');

const CustomerAdminRole = require('./customer/middlewares/cus-admin-middleware');

const CustomerActivateController = require('./customer/controllers/cust-activate-controller');

const CustomerSearchController = require('./customer/controllers/cus-search-controller');

const CustomerCookieController = require('./customer/controllers/cus-cookie-controller');

const CustomerCartController = require('./customer/controllers/cus-cart-controller');

const CustomerOrderController = require('./customer/controllers/cus-order-controller');


const CustomerActivateMiddlewre = require('./customer/middlewares/cus-activate-middleware');

const CustomerAddressController = require('./customer/controllers/cus-address-controller');

const CustomerDeliveryController = require('./customer/controllers/cus-delivery-controller');

const CustomerHomeController = require('./customer/controllers/cus-home-controller');
const CustomerWorkController = require('./customer/controllers/cus-worker-controller');

const CustomerworkingbookingMiddleware=require('./customer/middlewares/cus-workboking-middleware');

router.post('/api/customer/send-otp', CustomerAuthController.registerSingleCustomer);//

router.post('/api/customer/verify-otp', CustomerAuthController.verifyhashotpofCustomer);

router.get('/api/customer/refresh', CustomerAuthController.refreshCustomerToken);// cookie work

router.post('/api/customer/logout', CustomerAuthMiddleware, CustomerAuthController.logoutCustomer);// redux state updated karge //protected

// activate controller 

router.post('/api/customer/activate/user', CustomerAuthMiddleware, CustomerActivateController.activateCustomer);

router.get('/api/customer/activate/profile', CustomerAuthMiddleware, CustomerActivateController.getCustomerProfile);

router.get('/api/customer/search', CustomerSearchController.searchForProducts);

router.get('/api/customer/product/:id', CustomerSearchController.findSingleProductById);

// cookie cart api
router.get('/api/customer/cookie/set-cookie', CustomerCookieController.createCookie);

router.get('/api/customer/cookie/get-cookie', CustomerCookieController.getCookiecart);

router.post('/api/customer/cookie/add-cookie', CustomerCookieController.addItemCookieCartbyId);

router.post('/api/customer/cookie/update-cookie', CustomerCookieController.upadtaeCookieCartById);

router.post('/api/customer/cookie/del-cookie', CustomerCookieController.deleteCartCookieById);

router.get('/api/customer/cookie/check/:prId', CustomerCookieController.checkItemIsPresentInCookieCart);

//cart of customer api
router.get('/api/customer/cus-cart/get-all', CustomerAuthMiddleware, CustomerCartController.getAllCartOfUser);

router.get('/api/customer/cus-cart/single/:id', CustomerAuthMiddleware, CustomerCartController.getSingleItemOfCartById);

router.post('/api/customer/cus-cart/add', CustomerAuthMiddleware, CustomerCartController.addItemToCustomerCart);

router.post('/api/customer/cus-cart/update', CustomerAuthMiddleware, CustomerCartController.updateCartItemofCustomer);

router.post('/api/customer/cus-cart/delete', CustomerAuthMiddleware, CustomerCartController.deleteCartofCustomer);

router.get('/api/customer/cus-cart/check/:cusPrId', CustomerAuthMiddleware, CustomerCartController.findSingleInItemForCheck);

///api/customer/cus-cart/delete
// cutomer order api
router.post('/api/customer/order/add', CustomerAuthMiddleware, CustomerActivateMiddlewre, CustomerOrderController.registerOrder);//changes

router.get('/api/customer/order/get-all', CustomerAuthMiddleware, CustomerOrderController.findAllOrderOfCustomer);

router.get('/api/customer/order/single/:id', CustomerAuthMiddleware, CustomerOrderController.findSingleOrderForCustomer);

router.post('/api/customer/order/cancel', CustomerAuthMiddleware, CustomerOrderController.cancelCustomerOrderById);

router.get('/api/customer/address/form', CustomerAuthMiddleware, CustomerAddressController.findAdressForCsutomer);

//edit route 

router.get('/api/customer/edit-profile/get', CustomerAuthMiddleware, CustomerActivateController.getCustomerDataEditProfile);

router.post('/api/customer/edit-profile/add', CustomerAuthMiddleware, CustomerActivateController.editUpdateCustomerProfile);

// get delivery findOne 

router.get('/api/customer/delivery/single', CustomerAuthMiddleware, CustomerDeliveryController.findSingleDeliverTime);


//home page routes

router.get('/api/customer/catergory/all', CustomerHomeController.getTopCatergory);
router.get('/api/customer/home/topproducts/all', CustomerHomeController.findTopProductsForHome);
router.get('/api/customer/subcatergory/all/:id', CustomerHomeController.findAllSubCatergoryByParent);
router.get('/api/customer/product/all/:id', CustomerHomeController.findProductsbySubCatergory);
router.get('/api/customer/shopbycatergory/all', CustomerHomeController.findallshopbycatergory);


//service route
router.get('/api/customer/wk/works/all', CustomerWorkController.findAllWorkList);

router.post('/api/customer/wk/work/add', CustomerAuthMiddleware, CustomerActivateMiddlewre,CustomerworkingbookingMiddleware, CustomerWorkController.regsiterWorkinForCustomer);

router.get('/api/customer/wk/service/all', CustomerAuthMiddleware, CustomerWorkController.findAllWorkBooking);

router.get('/api/customer/wk/service/single/:id', CustomerAuthMiddleware, CustomerWorkController.findSingleWorkBooking);


module.exports = router;
