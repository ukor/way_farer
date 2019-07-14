const Trip = require('./trip.js');
const User = require('./user.js');
const CustomError = require('../errorHandles/wayFarerError.js');

class CancelTrip {
	constructor(trip_id, dbClient) {
		this.trip_id = trip_id;
		this.dbClient = dbClient;
	}

	beforeCancing() {
		if (this.trip_id === '') throw new CustomError('Invalid parameter passed', 'userError', 400);

		// user must be admin
		if (!this.is_admin) throw new CustomError('Only Admin can cancel trip.', 'userError', 300);

		// todo - make sure the trip exist

		return true;
	}

	async cancel() {
		this.beforeCancing();

		const c = await new Trip(this.dbClient).cancel(this.trip_id);

		return {
			message: 'trip cancel succesffuly.',
		}

	}

}

module.exports = CancelTrip;
