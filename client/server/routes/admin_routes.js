const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const Product = require('../models/product');
var ObjectId = mongoose.Types.ObjectId;

// @route   GET
// @desc    Get Admin Users
// @access  Private
// URL: http://localhost:5000/api/users
router.get('/adminusers', (req, res) => {
  User.find({}).exec((err, users) => {
    if (err) console.log(`ERROR: ${err}`);
    res.status(200).json({ users });
  });
});

// @route   GET
// @desc    Get a full list of inventory as Admin
// @access  Private
// URL: http://localhost:5000/api/inventory
router.get('/inventory', (req, res) => {
  Product.find({}).exec((err, inventory) => {
    if (err) console.log(`ERROR: ${err}`);
    res.status(200).json({ inventory });
  });
});

// @route   POST
// @desc    Create a new product as Admin
// @access  Private
// URL: http://localhost:5000/api/newproduct
router.post('/newproduct', (req, res) => {
  const { name, description, price } = req.body;

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

// @route   DELETE
// @desc    Get a specific product by id
// @access  Private
// URL: http://localhost:5000/api/inventory/:id
router.get('/singleitem', (req, res) => {
  // const id = req.query.id;
  // const id = req.params.id;

  // Product.findById(ObjectId(id)).exec((err, product) => {
  //   if (product) {
  //     res.json({ success: true });
  //   } else {
  //     res.json({ success: false });
  //   }
  // });
  res.json({ success: true });
});

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
//////////////////Adding users for testing purposes
router.post('/adduser', (req, res) => {
  // const { name, email, username, auth0_id } = req.body;
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    auth0_id: req.body.auth0_id
  });

  newUser.save().then(
    res.json({
      success: true
    })
  );
});

module.exports = router;
