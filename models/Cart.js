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
    type: Number,
    trim: true,
    required: [true, 'Please add some text']
  },    
  product_price: {
    type: Number,
    required: [true, 'Please add an Amount']
  }
});

const CartSchema = new mongoose.Schema({
  session_id: {
    type: String,
    trim: true,
    required: [true, 'Please add some text']
  },
  items: Array,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Cart', CartSchema);