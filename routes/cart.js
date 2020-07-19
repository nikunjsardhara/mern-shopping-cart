const express = require('express');
const router = express.Router();
const { getCart, addToCart, removeFromCart, updateQty} = require('../controllers/cart');

router
  .route('/')
  .get(getCart);

router
  .route('/addToCart/:product_id')
  .put(addToCart);

router
  .route('/removeFromCart/:product_id')
  .delete(removeFromCart);
  module.exports = router;

router
  .route('/updateQty/:product_id/:qty')
  .put(updateQty);
  module.exports = router;  