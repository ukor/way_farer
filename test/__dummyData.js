const slug = require('shortid');
module.exports = {
	signup: {
		first_name: `${slug.generate()}`,
		last_name: `${slug.generate()}`,
		email: `${slug.generate()}@gmail.test`,
		password: `${slug.generate()}`
	},
	signIn: {
		email: 'example@gmail.com',
		password: 'password',
	}
};
