const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
  name: String,
  email: String,
  password: String,
  isAdmin: Boolean
});

module.exports = mongoose.model('User', user);
