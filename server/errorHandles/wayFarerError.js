'use strict';
/**
 * Creates a new WayFarer Error
 *
 * @augments Error
 * @param {Error|string|object} message The error message
 * @property {string} message The error message
 * @property {string} stack The error call stack
 */
class WayFarerError extends Error {
	constructor(exception, name) {
		if (exception instanceof Error) {
			super(exception.message);
			this.message = exception.message
			this.name = message.name;
		} else {
			/** Either array or string */
			super(exception);
			this.message = exception;
			this.name = name;
		}
		this.stack = (new Error).stack;
	}
}

module.exports = WayFarerError;