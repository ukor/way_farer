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
			request.post('/v1/auth/signup').send(dummyData.signup).expect(200, done);
		});
		it('Expect sign up response body to be an object', function (done) {
			request.post('/v1/auth/signup')
				.send({
					first_name: `${slug.generate()}`,
					last_name: `${slug.generate()}`,
					email: `user_${slug.generate()}@gmail.test`,
					password: `${slug.generate()}`
				})
				.expect(function (response) {
					expect(response.body).to.be.an('object');
					expect(response.body).to.be.have.property('status');
					expect(response.body).to.be.have.property('data');
				})
				.expect(200, done);
		});
	});
});