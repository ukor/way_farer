const chai = require('chai');
const expect = chai.expect;
const wayFarerError = require('../server/errorHandles/wayFarerError');

function testFunction() {
	throw new wayFarerError('testError');
};
describe('Custom Error', function () {
	it('Expect an error to be thrown', function () {
		expect(function () {
			testFunction();
		}).to.throw('testError');
	});
})