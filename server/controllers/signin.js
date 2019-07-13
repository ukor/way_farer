const router = require('express').Router();
const signInValidator = require('../middlewares/validators/signin.js');
const Signin = require('../models/signin.js');

router.post(
  '/',
  (request, response, next) => {
    try {
      // do validation
      const { body } = request;
      const user = signInValidator(body);

      request.body = user;
      next();
    } catch (exception) {
      next(exception);
    }
  },
  async (request, response, next) => {
    try {
      // do sign in
      const { dbClient } = request.app.locals;
      const user = await new Signin(request.body, dbClient).authorize();
      response.json({
        status: 'success',
        data: user,
      });
    } catch (exception) {
      next(exception);
    }
  },
);

module.exports = router;
