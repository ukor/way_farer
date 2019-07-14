/* eslint-disable camelcase */
const Trip = require('./trip.js');
const CustomError = require('../errorHandles/wayFarerError.js');

class CancelTrip {
  constructor(tripDetails, dbClient) {
    this.tripDetails = tripDetails;
    this.dbClient = dbClient;
  }

  beforeCancing() {
    const { trip_id, is_admin } = this.tripDetails;
    if (trip_id === '' || !trip_id) throw new CustomError('Invalid parameter passed', 'userError', 400);

    // user must be admin
    if (!is_admin) throw new CustomError('Only Admin can cancel trip.', 'userError', 300);

    // todo - make sure the trip exist

    return true;
  }

  async cancel() {
    this.beforeCancing();
    const { trip_id } = this.tripDetails;
    await new Trip(this.dbClient).cancel(trip_id);

    return {
      message: 'Trip cancel succesffuly.',
    };
  }
}

module.exports = CancelTrip;
