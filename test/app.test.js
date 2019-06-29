require('dotenv').config();
const chai = require('chai');
const expect = chai.expect;
const app = `localhost:${process.env.PORT}`
const request = require('supertest')(app);

describe('Initializee Test', function () {
	it('Expect build to run without failing', function () {
		expect(1).to.equal(1);
	});

	describe('Express Setup', function () {
		it('Expect root route to return status code 200', function (done) {
			request.get('/').send().expect(200, done);
		});
	});
});