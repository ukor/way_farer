const bcrypt = require('bcrypt');
const user = require('./user.js');
const customError = require('../errorHandles/wayFarerError.js');
const jwt = require('jsonwebtoken');
const appConfig = require('../../package.json');

class Signup {

	constructor(userDetails, dbClient) {
		this._dbClient = dbClient
		// todo - structure data
		this._userDetails = userDetails;
	}

	async _beforeRegister(userDetails) {

		const dbClient = this._dbClient;
		// make sure there is no user with this email addres
		const isEmailInUse = await new user(userDetails.email).fetch('email', dbClient);
		if (isEmailInUse.length) throw new customError('Email is in use. Try another email address', 'userError');

		// hash password
		userDetails['password'] = await bcrypt.hash(userDetails['password'], 10);

		// make the first user an admin
		const isFirstUser = await new user(null).count(dbClient);
		userDetails['is_admin'] = isFirstUser === 0;

		return userDetails;
	};

	async _afterRegister(userDetails) {

		// generate token
		const token = await jwt.sign({
			firstName: userDetails.first_name,
			lastName: userDetails.last_name,
			userId: userDetails.slug,
			date: new Date(),
		}, process.env.jwtSecret, {
				expiresIn: '12h',
				audience: 'user',
				issuer: appConfig.name,
		});

		return {
			isAdmin: userDetails.is_admin,
			token,
			userId: userDetails.slug,
		}
	}

	async register() {

		const dbClient = this._dbClient;
		const userDetails = await this._beforeRegister(this._userDetails);
		const registerResp = await new user(userDetails).add(dbClient);

		if (!registerResp) throw new customError('Failed persisting user into database', 'devError');

		const resp = this._afterRegister(userDetails);

		return resp;
	}
}

module.exports = Signup;
