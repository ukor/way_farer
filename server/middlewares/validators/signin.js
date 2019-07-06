const validate = require('validate.js');
const { normalizeEmail, trim } = require('validator');
const customError = require('../../errorHandles/wayFarerError.js');

module.exports = (userDetails) => {
	const constraints = {
		email: {
			presence: true,
			email: true,
		},
		password: {
			presence: true
		}
	};

	const errors = validate(userDetails, constraints, { format: 'flat' });

	if (errors) throw new customError(errors, 'userError', 400);
	return {
		email: normalizeEmail(trim(userdetails.email)),
		password: trim(userdetails.password)
	};
}
