const router = require('express').Router();
const { isEmpty } = require('lodash');
const addTripValidator = require('../middlewares/validators/trip.js');
const CreateTrip = require('../models/createTrip.js');
const CancelTripValidator = require('../middlewares/validators/cancelTrip.js');
const CancelTrip = require('../models/cancelTrip.js');
const verifyToken = require('../models/tokenPaser.js');
const GetTrips = require('../models/getTrips.js');

router.post(
  '/',
  async (request, response, next) => {
    try {
      // parse token and check
      const { body } = request;
      await verifyToken(request);

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


router.get('/', async (request, response, next) => {
  try {
    // fetch trips
    const { dbClient } = request.app.locals;
    const trips = await new GetTrips(dbClient).all();
    response.json({
      status: 'success',
      data: trips,
    });
  } catch (exception) {
    next(exception);
  }
});

router.patch('/:trip_id', async (request, response, next) => {
  try {
    const { params, query } = request;
    const tid = isEmpty(params) ? query : params;
    request.body.trip_id = tid.trip_id;
    const { body } = request;
    // parse token and check
    await verifyToken(request);

    const tripDetails = CancelTripValidator(body);
    request.body = tripDetails;
    next();
  } catch (exception) {
    next(exception);
  }
}, async (request, response, next) => {
  try {
    const { dbClient } = request.app.locals;
    const { body } = request;
    const resp = new CancelTrip(body, dbClient).cancel();
    response.json({
      status: 'success',
      data: resp,
    });
  } catch (exception) {
    next(exception);
  }
});

module.exports = router;
