const chai = require('chai');
const expect = chai.expect;
const wayFarerError = require('../server/errorHandles/wayFarerError');

function testFunction() {
	throw new wayFarerError('testError', 'error name');
}

function testFunction2() {
	throw new wayFarerError(['testError', 'custom error'], 'error name');
}

suite('Custom Error', function() {
	suite('Pass string as exception', function() {
		test('Expect an error to be thrown', function() {
			expect(function() {
				testFunction();
			}).to.throw('testError');
		});
	});

	suite('Pass array as exception', function() {
		test('Expect an error to be thrown', function() {
			expect(function() {
				testFunction2();
			}).to.throw('testError');
		});
	});
});
