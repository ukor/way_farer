const router = require('express').Router();
const { isEmpty } = require('lodash');
const validator = require('../middlewares/validators/booking.js');
const tokenValidator = require('../models/tokenPaser.js');
const Bookings = require('../models/bookings.js');

router.post('/', (request, response, next) => {
  try {
    tokenValidator(request);
    const bookingDetails = validator.save(request.body);
    request.body = bookingDetails;
    next();
  } catch (exception) {
    next(exception);
  }
}, async (request, response, next) => {
  try {
    const { dbClient } = request.app.locals;
    const { body } = request;

    await new Bookings(dbClient).save(body);

    response.json({
      status: 'sucess',
      data: {
        trip_id: body.trip_slug,
        user_id: body.user_slug,
        id: body.slug,
        seat_number: body.seat_number,
      },
    });
  } catch (exception) {
    next(exception);
  }
});

router.get('/', (request, response, next) => {
  try {
    const { params, query } = request;
    const bookingDetails = isEmpty(params) ? query : params;
    const v = validator.fetch(bookingDetails);

    request.body = v;
    next();
  } catch (exception) {
    next(exception);
  }
}, async (request, response, next) => {
  try {
    const { body } = request;
    const { dbClient } = request.app.locals;
    if (body.is_admin) {
      const bookins = await new Bookings(dbClient).adminFetch();
      response.json({
        status: 'success',
        data: bookins,
      });
    } else {
      const bookins = await new Bookings(dbClient).userFetch(body.user_slug);
      response.json({
        status: 'success2',
        data: bookins,
      });
    }
  } catch (exception) {
    next(exception);
  }
});

router.delete('/:bookingId', (request, response, next) => {
  try {
    tokenValidator(request);
    const { params, body } = request;
    body.booking_id = params.bookingId;

    const bookingDetails = validator.remove(body);
    request.body = bookingDetails;
    next();
  } catch (exception) {
    next(exception);
  }
}, async (request, response, next) => {
  try {
    const { body } = request;
    const { dbClient } = request.app.locals;
    await new Bookings(dbClient).deleteBookings(body);
    response.json({
      status: 'success',
      data: {
        message: 'Bookings deleted successfully',
      },
    });
  } catch (exception) {
    next(exception);
  }
});

module.exports = router;
