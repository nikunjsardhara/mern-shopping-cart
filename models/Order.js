const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
  product_name: {
    type: String,
    trim: true,
    required: [true, 'Please add some text']
  },
  product_category: {
    type: String,
    trim: true,
    required: [true, 'Please add some text']
  },
  product_qty: {
    type: String,
    trim: true,
    required: [true, 'Please add some text']
  },    
  product_price: {
    type: Number,
    required: [true, 'Please add an Amount']
  }
});

const OrderSchema = new mongoose.Schema({
  items: Array,
  payment_status: {
    type: Number,
    trim: true,
    default:0,
    required: [false]
  },
  customer_mobile: {
    type: String,
    trim: true,
    required: [true, 'Please enter customer mobile']
  },
  customer_name: {
    type: String,
    trim: true,
    required: [true, 'Please enter customer name']
  },
  customer_email: {
    type: String,
    trim: true,
    required: [true, 'Please enter customer email']
  },    
  amount: {
    type: Number,
    required: [true, 'Please add an Amount']
  },
  session_id: {
    type: String,
    trim: true,
    required: [true, 'Please add some text']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', OrderSchema);