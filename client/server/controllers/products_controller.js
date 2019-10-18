const Product = require('../models/product');

module.exports = {
  //Read all of our products
  readProducts(req, res) {
    Product.find({}).exec((err, products) => {
      if (err) {
        console.log('Mongoose error--------', err);
      }
      console.log('Products---------', products);
      res.status(200).json({ products });
    });
  },

  //Read a specific product.  :id
  readProduct(req, res) {
    const id = req.params;

    Product.findById(id).exec((err, product) => {
      if (err) {
        console.log('Mongoose error', err);
      }
      console.log(`Returned Product: ${product}`);
      res.status(200).json({ product });
    });
  }
};
