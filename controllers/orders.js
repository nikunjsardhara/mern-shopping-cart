const Order = require('../models/Order');
const Cart = require('../models/Cart');

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({session_id:req.sessionID});
    //const orders = await Order.find();

    return res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}

exports.addOrder = async (req, res, next) => {
  try {
    
    let cartExist = await Cart.findOne({session_id:req.sessionID});
    if(cartExist!=null){
      
      var total_amount = 0;
      for(let item of cartExist.items) {
        total_amount = total_amount + (item.product_price * item.product_qty);
      }
      let order_data = {
        items : cartExist.items,
        customer_mobile : req.body.phone,
        customer_name : req.body.name,
        customer_email : req.body.email,
        payment_id : req.body.payment_id,
        amount : total_amount,
        payment_status : 1,
        session_id : req.sessionID
      };
      await Order.create(order_data);
      await cartExist.deleteOne();
      return res.status(201).json({
        success: true,
        data: order_data
      });      
    }
    return res.status(201).json({
      success: false,
      data: null
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