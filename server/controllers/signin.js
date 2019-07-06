const router = require('express').Router();
const signInValidator = require('../middlewares/validators/signin.js');
const signin = require('../models/signin.js');

router.post('/', function (request, response, next) {
	try {
		// do validation
		const { body } = request;
		let user = signInValidator(body);

		request.body = user;
		next();
	} catch (exception) {
		next(exception);
	}
}, async function (request, response, next) {
		try {
			// do sign in
			let user = await new signin(request.body, dbClient).authorize();
			response.json({
				status: 'success',
				data: user,
			});
		} catch (exception) {
			next(exception);
		}
});

module.exports = router;
