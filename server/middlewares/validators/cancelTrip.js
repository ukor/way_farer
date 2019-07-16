const validate = require('validate.js');
const { trim } = require('validator');
const CustomError = require('../../errorHandles/wayFarerError.js');

module.exports = (tripDetails) => {
  const constriant = {
    user_id: {
      presence: true,
    },
    trip_id: {
      presence: true,
    },
    is_admin: {
      presence: true,
    },
  };

  const errors = validate(tripDetails, constriant, { option: 'flat' });

  if (errors) throw new CustomError(errors, 'userErrror', 400);

  return {
    slug: trim(tripDetails.trip_id),
    is_admin: tripDetails.is_admin,
    user_id: trim(tripDetails.user_id),
  };
};
