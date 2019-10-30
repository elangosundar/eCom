const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const admin = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  password2: { type: String, required: true },
  isAdmin: { type: Boolean, required: true }
});

module.exports = mongoose.model('Admin', admin);