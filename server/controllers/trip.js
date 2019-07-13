const router = require('express').Router();
const addTripValidator = require('../middlewares/validators/trip.js');
const CreateTrip = require('../models/createTrip.js');

router.post('/', async (request, response, next) => {
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
}, async (request, response, next) => {
  try {
    const { dbClient } = request.app.locals;
		const { body } = request;
		console.log('body =>', body);
    const resp = await new CreateTrip(body, dbClient).create();
    response.json({
      status: 'sucess',
      data: resp,
    });
  } catch (exception) {
    next(exception);
  }
});

module.exports = router;
