const Trip = require('./trip.js');
const User = require('./user.js');
const CustomError = require('../errorHandles/wayFarerError.js');

class CreateTrip {
	constructor(tripDetails, dbClient){
		this.dbClient = dbclient;
		this.tripDetails = tripDetails;
	}

	async beforeCreatingTrip() {
		// make sure this is an admin
		const usr = await new User(this.tripDetails).fetch('slug', this.dbClient);
		if (!usr[0].is_admin) throw new CustomError('You need to be an admin to create trips.', 'userError', 403);

		// make sure a bus with that slug exist

		// check if bus has not been assign to another trip on that same day

		return true;
	}

	async create() {
		this.beforeCreatingTrip();
		// persit data in database
		await new Trip(this.dbClient).save(this.tripDetails);

		return this.afterCreatingTrip();
	}

	afterCreatingTrip() {
		return {
			tripId: this.tripDetails.slug,
			busId: this.tripDetails.busSlug,
			origin: this.tripDetails.origin,
			destination: this.tripDetails.destination,
			tripDate: this.tripDetails.tripDate,
			fare: this.tripDetails.fare,
			currency: this.tripDetails.currency,
		};
	}
}

module.exports = CreateTrip;
