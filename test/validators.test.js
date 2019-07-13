/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-undef */
require('dotenv').config();
const chai = require('chai');
const slug = require('shortid');
const moment = require('moment');

const { expect } = chai;
const dummyData = require('./__dummyData.js');
const signup = require('../server/middlewares/validators/signup.js');
const signin = require('../server/middlewares/validators/signin.js');
const addTrip = require('../server/middlewares/validators/trip.js');

describe('Middlewares Validators', () => {
  describe('Signup validator', () => {
    it('Expect return value to be an object', function () {
      const v = signup(dummyData.signup);
      expect(v).to.be.an('object');
      expect(v).to.have.property('email');
      expect(v).to.have.property('password');
    });

    it('Expect error to be thrown', function () {
      delete dummyData.signup.password;

      expect(function () {
        signup(dummyData.signup);
      }).to.throw();
    });
  });

  describe('SignIn validator', () => {
    it('Expect return value to be an object', function () {
      const v = signin(dummyData.signIn);
      expect(v).to.be.an('object');
      expect(v).to.have.property('email');
      expect(v).to.have.property('password');
    });

    it('Expect error to be thrown', function () {
      delete dummyData.signIn.password;

      expect(function () {
        signin(dummyData.signIn);
      }).to.throw();
    });
  });

  describe('Create Trip Validator', () => {
    it('Expect return value to be an object', function () {
      const v = addTrip({
        slug: slug.generate(),
        bus_id: slug.generate(),
        bus_slug: slug.generate(),
        origin: 'Abakaliki',
        destination: 'Asaba',
        trip_date: moment().utc().format('YYYY/MM/DD HH:mm:ss'),
        fare: 2500,
        created_by: slug.generate(),
        user_id: slug.generate(),
        status: 'active',
        date_created: moment().utc().format('YYYY/MM/DD HH:mm:ss'),
      });
      console.log(22, v);
      expect(v).to.be.an('object');
      expect(v).to.have.property('origin');
      expect(v).to.have.property('created_by');
    });

    it('Expect error to be thrown', function () {
      delete dummyData.trip.destination;

      expect(function () {
        addTrip(dummyData.trip);
      }).to.throw();
    });
  });
});
