const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('./user.js');
const CustomError = require('../errorHandles/wayFarerError.js');
const appConfig = require('../../package.json');

class Signup {
  constructor(userDetails, dbClient) {
    this.dbClient = dbClient;
    this.userDetails = userDetails;
  }

  async beforeRegister() {
    // make sure there is no user with this email addres
    const isEmailInUse = await new User(this.userDetails.email).fetch(
      'email',
      this.dbClient,
    );
    if (isEmailInUse.length) {
      throw new CustomError(
        'Email is in use. Try another email address',
        'userError',
      );
    }

    // hash password
    this.userDetails.password = await bcrypt.hash(
      this.userDetails.password,
      10,
    );

    // make the first user an admin
    const isFirstUser = await new User(null).count(this.dbClient);
    this.userDetails.is_admin = isFirstUser === 0;

    return this.userDetails;
  }

  async afterRegister() {
    // generate token
    const token = await jwt.sign(
      {
        firstName: this.userDetails.first_name,
        lastName: this.userDetails.last_name,
        userId: this.userDetails.slug,
        date: new Date(),
      },
      process.env.jwtSecret,
      {
        expiresIn: '12h',
        audience: 'user',
        issuer: appConfig.name,
      },
    );

    return {
      isAdmin: this.userDetails.is_admin,
      token,
      userId: this.userDetails.slug,
    };
  }

  async register() {
    this.userDetails = await this.beforeRegister();
    const registerResp = await new User(this.userDetails).add(this.dbClient);

    if (!registerResp) throw new CustomError('Failed persisting user into database', 'devError');

    const resp = this.afterRegister();

    return resp;
  }
}

module.exports = Signup;
