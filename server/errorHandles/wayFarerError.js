'use strict';
/**
 * Custom error handlers
 * @see https://pastebin.com/aRpPr5Sd and
 * @see https://stackoverflow.com/questions/1382107/whats-a-good-way-to-extend-error-in-javascript
 * @see https://javascript.info/custom-errors
 *
 * @param {*} error
 */

function customError(message, name, error_code = 410) {
	this.name = name;
	this.message = message;
	this.code = error_code;
	this.stack = (new Error()).stack;
}

module.exports = customError;