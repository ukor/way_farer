require('dotenv').config();
const chai = require('chai');
const expect = chai.expect;
const app = require('../app');
const request = require('supertest')(app);

suite('Initializee Test', function () {
	test('Expect build to run without failing', function () {
		expect(1).to.equal(1);
	});

	suite('GET /', function () {
		test('Expect root route to return status code 200', function (done) {
			request.get('/').send().expect(200, done);
		});
	});
});