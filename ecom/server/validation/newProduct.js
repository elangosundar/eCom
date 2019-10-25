const isEmpty = require('is-empty');
const Validator = require('validator');

module.exports = function newProductValidation(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.description = !isEmpty(data.description) ? data.description : '';
  data.price = !isEmpty(data.price) ? data.price : '';

  if (Validator.isEmpty(data.name)) {
    errors.name = 'The product must have a name';
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = 'The product must have a description';
  }

  if (Validator.isEmpty(data.price)) {
    errors.price = 'The product must have a price';
  }
  if (!Validator.isNumeric(data.price)) {
    errors.price = 'The price must be a number';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
