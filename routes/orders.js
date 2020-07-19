const express = require('express');
const router = express.Router();
const { getOrders, addOrder} = require('../controllers/orders');

router
  .route('/')
  .get(getOrders);

router
  .route('/addOrder')
  .post(addOrder);
module.exports = router;