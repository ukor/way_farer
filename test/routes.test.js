require('dotenv').config();
const chai = require('chai');
const expect = chai.expect;
const slug = require('shortid');
const app = require('../app');
const dummyData = require('./__dummyData.js');
const request = require('supertest')(app);

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
					email: `example@gmail.test`,
					password: `password`
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
				.send({password: 'password', email: ''})
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
