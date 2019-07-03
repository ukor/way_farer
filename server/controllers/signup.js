const router = require('express').Router();
const validator = require('../middlewares/validators/signup.js');

router.post('/', (request, response, next) => {
	try {
		const { body } = request;
		let user = validator(body);
		request.body = user;
		next();
	} catch (exception) {
		next(exception);
	}
}, async (request, response, next) => {
		try {
			// todo - save to db
			response.json({
				status: 'success',
				data: request.body,
			});
		} catch (exception) {
			next(exception);
		}
});

module.exports = router;