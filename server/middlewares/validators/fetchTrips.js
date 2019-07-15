const validate = require('validate.js');
const slug = require('shortid');
const { escape, trim } = require('validator');
const CustomError = require('../../errorHandles/wayFarerError.js');

const destination = (tripDetails) => {
	const constriant = {
		destination: {
			presence: true,
			type: 'string',
		};

		const errors = validate(tripDetails, constriant, { format: 'flat' });

		if(errors) throw new CustomError('Enter a valid destination.', 'userError', 400);

		return trim(escape(tripDetails.destination));
	}
};

const origin = (tripDetails) => {
	const constriant = {
		origin: {
			presence: true,
			type: 'string',
		};

		const errors = validate(tripDetails, constriant, { format: 'flat' });

		if(errors) throw new CustomError('Enter a valid destination.', 'userError', 400);

		return trim(escape(tripDetails.destination));
	}
};

const busId = (tripDetails) => {
	const constriant = {
		busId: {
			presence: true,
			type: 'string',
		};

		const errors = validate(tripDetails, constriant, { format: 'flat' });

		if(errors) throw new CustomError('Enter a valid bus id.', 'userError', 400);

		return trim(tripDetails.destination);
	}
};
const id = (tripDetails) => {
	const constriant = {
		id: {
			presence: true,
		};

		const errors = validate(tripDetails, constriant, { format: 'flat' });

		if(errors) throw new CustomError('Enter a valid trip id.', 'userError', 400);

		return trim(escape(tripDetails.destination));
	}
};

const tripId = (tripDetails) => {
	const constriant = {
		tripId: {
			presence: true,
			type: 'string',
		};

		const errors = validate(tripDetails, constriant, { format: 'flat' });

		if(errors) throw new CustomError('Enter a valid destination.', 'userError', 400);

		return trim(escape(tripDetails.destination));
	}
};

module.exports = { destination, origin, id, slug, tripId, busId };
