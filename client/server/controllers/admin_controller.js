const Product = require('../models/product');
const User = require('../models/user');

module.exports = {
  //Find all Admin Users
  getAdminUsers(req, res) {
    User.find().exec((err, users) => {
      if (err) console.log('Fin admin users --error', err);

      console.log('Admin users: ', users);
      res.status(200).json({ users });
    });
  },

  //Create a new Product
  createProduct(req, res) {
    const { name, description, price } = req.body;

    let newProduct = new Product({
      name,
      description,
      price
    });

    newProduct.save();

    res.status(200).json({ product: newProduct });
  },

  //Update a product
  updateProduct(req, res) {
    const { id } = req.params;
    const { name, description, price } = req.body;

    Product.findById(id).exec((err, product) => {
      if (err) console.log('Product error::::::', err);

      product.name = name;
      product.description = description;
      product.price = price;

      product.save();

      res.status(200).json({ product });
    });
  },

  //Delete Product
  deleteProduct(req, res) {
    const { id } = req.params;

    Product.deleteOne({ _id: id }).exec((err, product) => {
      if (err) console.log('Delete error::::::', err);
      res.status(200).json({ product });
    });
  }
};
