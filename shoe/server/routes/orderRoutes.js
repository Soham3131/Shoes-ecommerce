// src/routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { protect, admin } = require('../middlewares/authMiddleware');

router.post('/', protect, orderController.createOrder);
router.post('/:id/razorpay', protect, orderController.createRazorpayOrder);
router.post('/:id/verify-payment', protect, orderController.verifyPayment);
router.get('/myorders', protect, orderController.getMyOrders);


router.get('/completed', protect, admin, orderController.getCompletedOrders);


router.get('/unassigned', protect, admin, orderController.getUnassignedOrders);
router.get('/assigned', protect, admin, orderController.getAssignedOrders);

router.get('/cancelled', protect, admin, orderController.getCancelledOrders);

router.post('/revert-status', protect, admin, orderController.revertOrderStatus);


module.exports = router;