const validate = require('validate.js');
const slug = require('shortid');
const { escape, trim } = require('validator');
const moment = require('moment');
const CustomError = require('../../errorHandles/wayFarerError.js');

const validateTripDetails = (tripDetails) => {
  const td = tripDetails;
  const constriant = {
    bus_slug: {
      presence: true,
      type: 'string',
    },
    origin: {
      presence: true,
      type: 'string',
    },
    destination: {
      presence: true,
      type: 'string',
    },
    trip_date: {
      presence: true,
      type: 'string',
    },
    fare: {
      presence: true,
      type: 'number',
    },
    created_by: {
      presence: true,
      type: 'string',
    },
  };
  const errors = validate(td, constriant, { format: 'flat' });

  if (errors) throw new CustomError(errors, 'userError', 404);

  return {
    slug: slug.generate(),
    bus_id: trim(td.bus_slug),
    origin: trim(td.origin),
    destination: trim(escape(td.destination)),
    trip_date: trim(td.trip_date),
    fare: td.fare,
    created_by: trim(td.created_by),
    status: 'active',
    date_created: moment().utc().format('YYYY/MM/DD HH:mm:ss'),
    is_admin: td.is_admin ? td.is_admin : null,
  };
};

module.exports = validateTripDetails;
