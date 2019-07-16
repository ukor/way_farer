const router = require('express').Router();
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

router.get('/', (request, response, next) => { }, async (request, response, next) => { });
router.delete('/', (request, response, next) => { }, async (request, response, next) => { });

module.exports = router;
