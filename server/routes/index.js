
const trip = require('../controllers/trip.js');

module.exports = function (app) {
  app.use('/v1/auth/signup', require('../controllers/signup.js'));
  app.use('/v1/auth/signin', require('../controllers/signin.js'));
  app.use('/v1/trips', trip);
};
