const Trip = require('./trip.js');
const User = require('./user.js');
const CustomError = require('../errorHandles/wayFarerError.js');

class CreateTrip {
  constructor(tripDetails, dbClient) {
    this.dbClient = dbClient;
    this.tripDetails = tripDetails;
  }

  async beforeCreatingTrip() {
    // make sure this is an admin
    if (this.tripDetails.is_admin === null || this.tripDetails.is_admin === undefined) {
      const usr = await new User(this.tripDetails).fetch('slug', this.dbClient);
      if (!usr[0].is_admin) throw new CustomError('You need to be an admin to create trips.', 'userError', 403);
    } else if (this.tripDetails.is_admin === false) {
      throw new CustomError('You need to be an admin to create trips.', 'userError', 403);
    } else {
      // todo - make sure a bus exist

      // todo - check if bus has not been assign to another trip on that same day and time
    }
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
      trip_id: this.tripDetails.slug,
      bus_id: this.tripDetails.bus_slug,
      origin: this.tripDetails.origin,
      destination: this.tripDetails.destination,
      trip_date: this.tripDetails.trip_date,
      fare: this.tripDetails.fare,
      currency: this.tripDetails.currency,
    };
  }
}

module.exports = CreateTrip;
