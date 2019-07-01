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
	constructor(message) {
		if (message instanceof Error) {
			super(message.message);
			this.stack = message.stack;
		} else {
			if (typeof message === 'string') {
				super(message);
			} else {
				super(message.message || message.errmsg || message.$err || 'n/a');
				for (var name in message) {
					this[name] = message[name];
				}
			}
			Error.captureStackTrace(this, this.constructor);
		}
		this.name = 'MongoError';
	}
}

module.exports = WayFarerError;