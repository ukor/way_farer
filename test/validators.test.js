require('dotenv').config();
const chai = require('chai');
const expect = chai.expect;
const dummyData = require('./__dummyData.js');
const signup = require('../server/middlewares/validators/signup.js');

describe('Middlewares Validators', function () {

	describe('Signup validator', function () {

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
});