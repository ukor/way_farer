const validate = require('validate.js');
const slug = require('shortid');
const CustomError = require('../../errorHandles/wayFarerError.js');

const save = (bookingsDetails) => {
  const constriant = {
    user_id: {
      presence: true,
    },
    is_admin: {
      presence: true,
    },
    trip_id: {
      presence: true,
    },
  };

  const errors = validate(bookingsDetails, constriant, { format: 'flat' });

  if (errors) throw new CustomError(errors, 'userError', 400);


  return {
    slug: slug.generate(),
    user_slug: bookingsDetails.user_id,
    trip_slug: bookingsDetails.trip_id,
    seat_number: bookingsDetails.seat_number,
    created_on: new Date(),
  };
};

const fetch = (bookingsDetails) => {
  const constraint = {
    is_admin: {
      presence: true,
    },
    user_id: {
      presence: true,
    },
  };

  const errors = validate(bookingsDetails, constraint, { format: 'flat' });
  if (errors) throw new CustomError(errors, 'userError', 400);

  return {
    user_slug: bookingsDetails.user_id,
    is_admin: bookingsDetails.is_admin === 'true',
  };
};

const remove = (bookingsDetails) => {
  const constriant = {
    user_id: {
      presence: true,
    },
    is_admin: {
      presence: true,
    },
    trip_id: {
      presence: true,
    },
    booking_id: {
      presence: true,
    },
  };

  const errors = validate(bookingsDetails, constriant, { format: 'flat' });

  if (errors) throw new CustomError(errors, 'userError', 400);

  return {};
};

module.exports = { save, remove, fetch };
