// Server
const express = require('express');
const bodyParser = require('body-parser');
// Session, Allows server to use Cookie
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
// Database URI
db = require('./keys').URI;
session_secret = require('./keys').session;

//Routes
var adminRouter = require('./routes/admin_routes');

const app = express();

// Controllers || How we will define our endpoints
// const adminController = require('./controllers/admin_controller');
// const cloudinaryController = require('./controllers/cloudinary_controller');
// const userController = require('./controllers/user_controller');
// const productsController = require('./controllers/products_controller');

//Make sure that Port is the same as the proxy
const PORT = process.env.PORT || 5000;

// Connect to Mlab
mongoose.connect(db, { useNewUrlParser: true }, err => {
  if (err) {
    console.log('DB Error', err);
  }
  console.log('Connected to database');
});

// Middleware. Initializing req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Storing Cookies
app.use(
  session({
    secret: session_secret,
    resave: false, // If set to true, can cause memory leak
    saveUninitialized: false,
    cookie: {
      // Max age of the cookie
      maxAge: Date.now() + 30 * 86400 * 1000 // 24 hrs before expiration
    }
  })
);

// Allow user to use cross origin requests
app.use(cors());

// // The timeout is to allow the database to connect before anything else
// setTimeout(() => {
//   //Read the user's session.
//   app.get('/api/user-data', userController.readUserData);

//   //Add a item to cart.
//   app.post('/api/user-data/cart', userController.addToCart);

//   //Remove a item from the cart.
//   app.delete('/api/user-data/cart/:id', userController.removeFromCart);

//   //User login
//   app.post('/api/login', userController.login);
//   //Just need a login, since you are logging from your social media provider no need to register, only looks if a user already has a account.

//   //When the user logouts
//   app.post('/api/logout', userController.logout);

//   ///////////// Products endpoints ////////////

// }, 200);

app.use('/api', adminRouter);

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
