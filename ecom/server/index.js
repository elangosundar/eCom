const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const mongoose = require('mongoose');

// Database URI
db = require('./keys').URI;
// Cookie Secret
session_secret = require('./keys').session;

//Routes
var Routes = require('./routes/routes');

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

//Passport Middleware
app.use(passport.initialize());

//Passport config
require('./passport/passport_cust')(passport);

// Middleware. Initializing req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Allow cross origin requests
app.use(cors());

app.use('/api', Routes);

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
