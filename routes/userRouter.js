import express from "express";
import userCtrl from '../controllers/userController.js'

const router = express.Router()

router.patch("/customer/edit",  userCtrl.customerDetails);
router.patch("/seller/edit",  userCtrl.sellerDetails);
router.get("/store",  userCtrl.store);

router.get("/user/:userId",  userCtrl.userDetails);

//Products
router.get("/products",  userCtrl.getProducts);
router.post("/seller/addProduct",  userCtrl.uploadProduct);
router.get("/product/getStoreProduct/:storeId",  userCtrl.getStoreProduct);
router.get("/product/:productId",  userCtrl.getParticularProducts);

router.get("/search/:search",  userCtrl.search);

//Order Customer
router.post("/customer/order",  userCtrl.order);
router.get("/customer/order/:customerId",  userCtrl.getCustomerOrder);

router.get("/seller/order/:sellerId",  userCtrl.getStoreOrder);

router.patch("/seller/order/accept",  userCtrl.OrderAccept);

export default router;
