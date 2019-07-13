const validate = require('validate.js');
const validator = require('validator');
const shortId = require('shortid');
// const moment = require('moment');
const CustomError = require('../../errorHandles/wayFarerError.js');

module.exports = function (userDetails) {
  const constriant = {
    first_name: {
      presence: true,
      type: 'string',
    },
    last_name: {
      presence: true,
      type: 'string',
    },
    email: {
      presence: true,
      email: true,
      type: 'string',
    },
    password: {
      presence: true,
      type: 'string',
    },
  };

  const errors = validate(userDetails, constriant, { format: 'flat' });

  if (errors) throw new CustomError(errors, 'validationError');

  return {
    slug: shortId.generate(),
    email: validator.normalizeEmail(validator.trim(userDetails.email)),
    first_name: validator.escape(validator.trim(userDetails.first_name)),
    last_name: validator.escape(validator.trim(userDetails.last_name)),
    password: validator.trim(userDetails.password),
    is_admin: false,
    date_joined: new Date(),
  };
};
