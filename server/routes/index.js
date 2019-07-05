module.exports = function (app) {
	app.use('/v1/auth/signup', require('../controllers/signup.js'));
};
