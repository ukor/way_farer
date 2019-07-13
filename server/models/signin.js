/* eslint-disable camelcase */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./user.js');
const CustomError = require('../errorHandles/wayFarerError.js');
const appConfig = require('../../package.json');

class SignIn {
  constructor(signinDetails, dbClient) {
    this.userDetails = signinDetails;
    this.dbClient = dbClient;
  }

  async beforeAuthorizing() {
    // fetch user from db using email address
    const ud = await new User(this.userDetails.email).fetch(
      'email',
      this.dbClient,
    );
    if (ud.length <= 0) {
      throw new CustomError(
        'Incorrect email address or password.',
        'userError',
        400,
      );
    }
    const {
      password, slug, is_admin, first_name, last_name,
    } = ud[0];
    // compare password hash
    const isPasswordMatch = await bcrypt.compare(
      this.userDetails.password,
      password,
    );

    if (!isPasswordMatch) {
      throw new CustomError(
        'Incorrect email address or password.',
        'userError',
        400,
      );
    }

    return {
      slug,
      is_admin,
      first_name,
      last_name,
    };
  }

  // eslint-disable-next-line class-methods-use-this
  afterAuthorizing(userSlug, token, is_admin) {
    return {
      userId: userSlug,
      token,
      isAdmin: is_admin,
    };
  }

  async authorize() {
    const authenticate = await this.beforeAuthorizing();

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

    return this.afterAuthorizing(
      authenticate.slug,
      token,
      authenticate.is_admin,
    );
  }
}

module.exports = SignIn;
