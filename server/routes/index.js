const signup = require('../controllers/signup.js');
const signin = require('../controllers/signin.js');
const trip = require('../controllers/trip.js');
const booking = require('../controllers/bookings.js');

module.exports = function (app) {
  app.use('/v1/auth/signup', signup);
  app.use('/v1/auth/signin', signin);
  app.use('/v1/trips', trip);
  app.use('/v1/bookings', booking);
};
