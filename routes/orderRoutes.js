const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/place', orderController.placeOrder); 
router.get('/detail', orderController.getOrderDetail); // order detail  will shown  after clicking
router.patch("/updateStatus/:orderId", orderController.updateOrderStatus);   // created new functnality to update status cancel or placed


module.exports = router;
