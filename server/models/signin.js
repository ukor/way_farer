const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('./user.js');
const customError = require('../errorHandles/wayFarerError.js');
const appConfig = require('../../package.json');

class SignIn {
  constructor(signinDetails, dbClient) {
    this._userDetails = signinDetails;
    this._dbClient = dbClient;
  }

  async _beforeAuthorizing() {
    // fetch user from db using email address
    const ud = await new user(this._userDetails.email).fetch(
      'email',
      this._dbClient,
    );
    if (ud.length <= 0) {throw new customError(
				'Incorrect email address or password.',
				'userError',
				400
			);}
    const {
 password, slug, is_admin, first_name, last_name
} = ud[0];
    // compare password hash
    const isPasswordMatch = await bcrypt.compare(
      this._userDetails.password,
      password,
    );

    if (!isPasswordMatch) {throw new customError(
				'Incorrect email address or password.',
				'userError',
				400
			);}

    return {
      slug,
      is_admin,
      first_name,
      last_name,
    };
  }

  _afterAuthorizing(userSlug, token, is_admin) {
    return {
      userId: userSlug,
      token,
      isAdmin: is_admin,
    };
  }

  async authorize() {
    const authenticate = await this._beforeAuthorizing();

    const token = await jwt.sign(
      {
        firstName: authenticate.first_name,
        lastName: authenticate.last_name,
        userId: authenticate.slug,
        date: new Date(),
      },
      process.env.jwtSecret,
      {
        expiresIn: '12h',
        audience: `${authenticate.first_name} ${authenticate.last_name}`,
        issuer: appConfig.name,
      },
    );

    return this._afterAuthorizing(
      authenticate.slug,
      token,
      authenticate.is_admin,
    );
  }
}

module.exports = SignIn;
