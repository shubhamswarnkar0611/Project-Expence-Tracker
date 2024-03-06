const express = require('express');
const OrderController = require('../controllers/orderC');
const fetchUser = require('../middleware/fetchUser');
const router =express.Router();

router.post("/purchase-membership",fetchUser,OrderController.purchaseMembership);
router.post("/update-order",fetchUser,OrderController.updateOrder);

module.exports=router