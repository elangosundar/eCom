const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 12;
const passport = require('passport-jwt');
var jwt = require('jsonwebtoken');
const keys = require('../keys');
const User = require('../models/user');
const Product = require('../models/product');
const Admin = require('../models/admin');
var ObjectId = mongoose.Types.ObjectId;

// Validation
const newProductValidation = require('../validation/newProduct');
const newAdminValidation = require('../validation/newAdmin');
const loginValidation = require('../validation/login');

////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
//////////////// ADMIN ROUTES //////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

// @route   GET
// @desc    Get Admin Users
// @access  Private
// URL: http://localhost:5000/api/adminUsers
router.get('/adminusers', (req, res) => {
  Admin.find({}).exec((err, adminUsers) => {
    if (err) console.log(`ERROR: ${err}`);
    res.status(200).json({ adminUsers });
  });
});

// @route   GET
// @desc    Get non Admin Users
// @access  Private
// URL: http://localhost:5000/api/customerUsers
router.get('/customerUsers', (req, res) => {
  User.find({}).exec((err, users) => {
    if (err) console.log(`ERROR: ${err}`);
    res.status(200).json({ users });
  });
});

// @route   GET
// @desc    Get a full list of inventory as Admin
// @access  Private
// URL: http://localhost:5000/api/adminInventory
router.get('/adminInventory', (req, res) => {
  Product.find({})
    .then(inventory => {
      res.json({ inventory });
    })
    .catch(err => console.log(err));
});

// @route   POST
// @desc    Create a new product as Admin
// @access  Private
// URL: http://localhost:5000/api/newproduct
router.post('/newproduct', (req, res) => {
  const { errors, isValid } = newProductValidation(req.body);
  const { name, description, price } = req.body;

  if (!isValid) {
    return res.status(400).json(errors);
  }

  let newProduct = new Product({
    name,
    description,
    price
  });
  newProduct.save();
  res.status(200).json({ product: newProduct });
});

// @route   DELETE
// @desc    Delete a product by ID as Admin
// @access  Private
// URL: http://localhost:5000/api/deleteproduct
router.delete('/deleteproduct', (req, res) => {
  const id = req.body.id;
  Product.findByIdAndDelete(ObjectId(req.body.id)).exec((err, product) => {
    if (product) {
      res.json({ success: true });
    } else {
      res.json({ success: false, message: 'Something went wrong' });
    }
  });
});

// @route   POST
// @desc    Add Admin User
// @access  Public
// URL: http://localhost:5000/api/addAdmin
router.post('/addAdmin', (req, res) => {
  const { errors, isValid } = newAdminValidation(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const name = req.body.name;
  const email = req.body.email;

  //Check to see if that email is already being used
  Admin.findOne({ email }).then(admin => {
    if (admin) {
      return res.status(400).json({
        email:
          'That email is already being used.Please try again with a different email'
      });
    } else {
      bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        const newAdmin = new Admin({
          name: req.body.name,
          email: req.body.email,
          password: hash,
          password2: hash,
          isAdmin: req.body.isAdmin
        });

        newAdmin
          .save()
          .then(
            res.json({
              success: true
            })
          )
          .catch(err => console.log(err));
      });
    }
  });
});

// @route   Delete
// @desc    Delete Admin Account
// @access  Private
// URL: http://localhost:5000/api/deleteAdmin
router.delete('/deleteAdmin', (req, res) => {
  const id = req.query.id;

  Admin.findByIdAndDelete(ObjectId(req.query.id))
    .then(admin => {
      if (admin) {
        res.json({
          success: true,
          account: `${admin.name}`
        });
      } else {
        res.json({
          success: false,
          message: 'Unable to find that account'
        });
      }
    })
    .catch(err => console.log(err));
});

// @route   POST
// @desc    Login as admin
// @access  Public
// URL: http://localhost:5000/api/loginAdmin
router.post('/loginAdmin', (req, res) => {
  const { errors, isValid } = loginValidation(req.body);

  const { email, password } = req.body;

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Admin.findOne({ email }).then(admin => {
    if (!admin) {
      return res.status(400).json({
        email: ' That email is not registered with us. Please try again'
      });
    }

    bcrypt.compare(password, admin.password).then(isMatch => {
      if (!isMatch) {
        res.json({
          success: 'False',
          message: 'Email or password is incorrect. Please try again'
        });
      } else {
        const payload = {
          name: admin.name,
          email: admin.email,
          isAdmin: admin.isAdmin,
          id: admin.id
        };

        jwt.sign(
          payload,
          keys.secretTokenKey,
          { expiresIn: 3600 }, // 1 hour expiration
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        );
      }
    });
  });
});

////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
//////////////// CUSTOMER ROUTES ///////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

// @route   GET
// @desc    Get a specific product by id
// @access  Public
// URL: http://localhost:5000/api/inventory/:id
router.get('/singleitem/:id', (req, res) => {
  // Req.paramas || Path Variables // Product id
  const id = req.params.id;

  Product.findById(ObjectId(id)).exec((err, product) => {
    if (product) {
      res.json({ success: true, product });
    } else {
      res.json({ success: false });
    }
  });
});

// @route   POST
// @desc    Customer Sign Up
// @access  Public
// URL: http://localhost:5000/api/addAdmin
router.post('/newCustomer', (req, res) => {
  const { errors, isValid } = newAdminValidation(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const name = req.body.name;
  const email = req.body.email;

  //Check to see if that email is already being used
  User.findOne({ email }).then(user => {
    if (user) {
      return res.status(400).json({
        email:
          'That email is already being used.Please try again with a different email'
      });
    } else {
      bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: hash,
          password2: hash,
          isAdmin: req.body.isAdmin
        });

        newUser
          .save()
          .then(
            res.json({
              success: true
            })
          )
          .catch(err => console.log(err));
      });
    }
  });
});

// @route   Delete
// @desc    Delete Customer Account
// @access  Private
// URL: http://localhost:5000/api/deleteAccount
router.delete('/deleteAccount', (req, res) => {
  const id = req.query.id;

  User.findByIdAndDelete(ObjectId(req.query.id))
    .then(user => {
      if (user) {
        res.json({
          success: true,
          account: `${user.name}`
        });
      } else {
        res.json({
          success: false,
          message: 'Unable to find that account'
        });
      }
    })
    .catch(err => console.log(err));
});

// @route   POST
// @desc    Login as customer
// @access  Public
// URL: http://localhost:5000/api/loginCustomer
router.post('/loginCustomer', (req, res) => {
  const { errors, isValid } = loginValidation(req.body);

  const { email, password } = req.body;

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(400).json({
        email: ' That email is not registered with us. Please try again'
      });
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) {
        res.json({
          success: 'False',
          message: 'Email or password is incorrect. Please try again'
        });
      } else {
        const payload = {
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          id: user.id
        };

        jwt.sign(
          payload,
          keys.secretTokenKey,
          { expiresIn: 3600 }, // 1 hour expiration
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        );
      }
    });
  });
});

module.exports = router;
