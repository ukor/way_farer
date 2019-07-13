/* eslint-disable no-undef */
/* eslint-disable prefer-arrow-callback */
require('dotenv').config();
const chai = require('chai');

const { expect } = chai;
const slug = require('shortid');
const app = require('../app');
// eslint-disable-next-line import/order
const request = require('supertest')(app);
const dummyData = require('./__dummyData.js');

describe('Routes Test', function () {
  describe('POST /v1/auth/signup', function () {
    it('Expect sign up route to return status code 200', function (done) {
      request.post('/v1/auth/signup').send(dummyData.adminUser).expect(200, done);
    });
    it('Expect sign up response body to be an object', function (done) {
      request.post('/v1/auth/signup')
        .send({
          first_name: `${slug.generate()}`,
          last_name: `${slug.generate()}`,
          email: 'example@gmail.test',
          password: 'password',
        })
        .expect(function (response) {
          expect(response.body).to.be.an('object');
          expect(response.body).to.be.have.property('status');
          expect(response.body).to.be.have.property('data');
        })
        .expect(200, done);
    });
  });

  describe('POST /v1/auth/signin', function () {
    it('Expect sign in route to return status code 200', function (done) {
      request.post('/v1/auth/signin').send(dummyData.signIn).expect(200, done);
    });
    it('Expect sign in response body to be an object', function (done) {
      request.post('/v1/auth/signin')
        .send(dummyData.signIn)
        .expect(function (response) {
          expect(response.body).to.be.an('object');
          expect(response.body).to.be.have.property('status');
          expect(response.body).to.be.have.property('data');
        })
        .expect(200, done);
    });

    it('Expect sign in response body to be an object with status = error', function (done) {
      request.post('/v1/auth/signin')
        .send({ password: 'password', email: '' })
        .expect(function (response) {
          expect(response.body).to.be.an('object');
          expect(response.body).to.be.have.property('status', 'error');
          expect(response.body).to.be.have.property('error');
          expect(response.body).to.be.have.property('code', 400);
        })
        .expect(200, done);
    });
  });

  describe('POST /v1/trips', function () {
    it('Expect creating trips route to return 200', function (done) {
      request.post('/v1/trips').send(dummyData.trip).expect(200, done);
    });
    it('Expect creating trips route to be an object', function (done) {
      request.post('/v1/trips')
        .send(dummyData.trip)
        .expect(function (response) {
          expect(response.body).to.be.an('object');
          expect(response.body).to.be.have.property('status');
          expect(response.body).to.be.have.property('data');
        })
        .expect(200, done);
    });

    it('Expect /v1/trips response body to be an object with status = error', function (done) {
      delete dummyData.trip.bus_id;
      request.post('/v1/trips')
        .send(dummyData.trip)
        .expect(function (response) {
          expect(response.body).to.be.an('object');
          expect(response.body).to.be.have.property('status', 'error');
          expect(response.body).to.be.have.property('error');
          expect(response.body).to.be.have.property('code', 400);
        })
        .expect(200, done);
    });
  });
});
