const router = require('express').Router();
const addTripValidator = require('../middlewares/validators/trip.js');
const CreateTrip = require('../models/createTrip.js');
const CancelTripValidator = require('../middlewares/validators/cancelTrip.js');
const CancelTrip = require('../models/cancelTrip.js');
router.post(
  '/',
  async (request, response, next) => {
    try {
      const { headers, body } = request;
      // check for token
      const token = headers.authorization ? headers.authorization : body.token;
      console.log('token', token);
      // todo - parse token and check

      // validate request body
      const tripDetails = addTripValidator(body);
      request.body = tripDetails;

      next();
    } catch (exception) {
      next(exception);
    }
  },
  async (request, response, next) => {
    try {
      const { dbClient } = request.app.locals;
      const { body } = request;
      const resp = await new CreateTrip(body, dbClient).create();
      response.json({
        status: 'sucess',
        data: resp,
      });
    } catch (exception) {
      next(exception);
    }
  },
);

router.patch('/', (request, response, next) => {
	try {
		const { headers, body } = request;
		// check for token
		const token = headers.authorization ? headers.authorization : body.token;
		console.log('token', token);

		const tripDetails = CancelTripValidator(body.trip_id);
		request.body = tripDetails;
	} catch (exception) {
		next(exception);
	}
}, async (request, response, next) => {
		try {
			const { dbClient } = request.app.locals;
			const resp = new CancelTrip(tripDetails, dbClient).cancel();
			response.json({
				status: 'success',
				data: resp,
			});
		} catch (exception) {
			next(exception);
		}
});

module.exports = router;
