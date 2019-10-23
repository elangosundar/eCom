const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');

// Database URI
db = require('./keys').URI;
// Cookie Secret
session_secret = require('./keys').session;

//Routes
var adminRouter = require('./routes/admin_routes');

const app = express();

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

// Allow cross origin requests
app.use(cors());

app.use('/api', adminRouter);

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
