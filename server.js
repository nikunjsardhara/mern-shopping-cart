const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const session = require('express-session')

dotenv.config({ path: './config/config.env' });

connectDB();

const app = express();
var expiryDate = new Date(Date.now() + 60 * 480 * 1000);
app.use(session({
  secret: process.env.SESSION_SECRET,
  name: 'session_id',
  cookie: {
    secure: false,
    saveUninitialized: false,
    resave: false,
    expires: expiryDate,
    httpOnly: false
    
  }
}));

const products = require('./routes/products');
const orders = require('./routes/orders');
const cart = require('./routes/cart');

//app.use(cors());
app.use(bodyParser.json());

app.use('/api/v1/products', products);
app.use('/api/v1/orders', orders);
app.use('/api/v1/cart', cart);

app.set('trust proxy', 1)
app.use(express.json());

if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

