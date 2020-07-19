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

module.exports = mongoose.model('Product', ProductSchema);