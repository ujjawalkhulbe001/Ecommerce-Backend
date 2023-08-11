const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Add product to cart
router.patch('/add', cartController.addToCart); 
router.patch('/remove/:productId', cartController.removeFromCart); // replace delete with patch
router.get('/',cartController.getCartItems);// removed user id because now cart is in user database
module.exports = router;
