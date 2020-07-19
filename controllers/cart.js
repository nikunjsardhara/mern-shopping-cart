const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({session_id:req.sessionID});

    return res.status(200).json({
      success: true,
      data: cart
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}

exports.addToCart = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.product_id);
    product.product_qty = 1;
    let cartExist = await Cart.findOne({session_id:req.sessionID});
    if(cartExist!=null){
      let itemExist = false;
      for(let item of cartExist.items) {
        if(item._id == req.params.product_id){
          item.product_qty = parseInt(item.product_qty)+1;
          itemExist = true;
        }
      }
      if(!itemExist){
        cartExist.items.push(product);
      }
      cartExist.markModified('items');
      var resu = await cartExist.save();
      return res.status(201).json({
        success: true,
        data: cartExist
      });      
    }else{
      let cart_data = {
        session_id : req.sessionID,
        items : [product],
      }
      const cart = await Cart.create(cart_data);
      
      return res.status(201).json({
        success: true,
        data: cart
      });
    }
  } catch (err) {
    if(err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);

      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      console.log(err);
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
}

exports.removeFromCart = async (req, res, next) => {
  try {
    
    let cartExist = await Cart.findOne({session_id:req.sessionID});
    if(cartExist!=null){
      let itemExist = false;
      for (let index = 0; index < cartExist.items.length; index++) {
        if(cartExist.items[index]._id == req.params.product_id){
          cartExist.items.splice(index,1);
        }
      }
      cartExist.markModified('items');
      var resu = await cartExist.save();
    }
    return res.status(201).json({
      success: true,
      data: cartExist
    });
  } catch (err) {
    if(err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);

      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      console.log(err);
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
}

exports.updateQty = async (req, res, next) => {
  try {
    
    let cartExist = await Cart.findOne({session_id:req.sessionID});
    if(cartExist!=null){
      let itemExist = false;
      for (let index = 0; index < cartExist.items.length; index++) {
        if(cartExist.items[index]._id == req.params.product_id){
          cartExist.items[index].product_qty = req.params.qty;
        }
      }
      cartExist.markModified('items');
      var resu = await cartExist.save();
    }
    return res.status(201).json({
      success: true,
      data: cartExist
    });
  } catch (err) {
    if(err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);

      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      console.log(err);
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
}