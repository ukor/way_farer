const signup = require('../controllers/signup.js');
const signin = require('../controllers/signin.js');
const trip = require('../controllers/trip.js');

module.exports = function (app) {
  app.use('/v1/auth/signup', signup);
  app.use('/v1/auth/signin', signin);
  app.use('/v1/trips', trip);
};
