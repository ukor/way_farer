const router = require('express').Router();
const validator = require('../middlewares/validators/signup.js');
const Signup = require('../models/signup.js');

router.post(
  '/',
  (request, response, next) => {
    try {
      const { body } = request;
      const user = validator(body);
      request.body = user;
      next();
    } catch (exception) {
      next(exception);
    }
  },
  async (request, response, next) => {
    try {
      const { dbClient } = request.app.locals;
      const userResp = await new Signup(request.body, dbClient).register();
      response.json({
        status: 'success',
        data: userResp,
      });
    } catch (exception) {
      next(exception);
    }
  },
);

module.exports = router;
