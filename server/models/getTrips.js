const Trips = require('./trip.js');

class getTrip {
  constructor(dbClient) {
    this.dbClient = dbClient;
  }

  async all() {
    const trips = await new Trips(this.dbClient).fetch('all', 'active');

    return trips;
  }

  async withId(id) {
    const trips = await new Trips(this.dbClient).fetch('id', id);

    return trips;
  }

  async withSlug(slug) {
    const trips = await new Trips(this.dbClient).fetch('slug', slug);

    return trips;
  }

  async withBusId(busId) {
    const trips = await new Trips(this.dbClient).fetch('bus', busId);

    return trips;
  }

  async withOrigin(origin) {
    const trips = await new Trips(this.dbClient).fetch('origin', origin);

    return trips;
  }

  async withDestination(destination) {
    const trips = await new Trips(this.dbClient).fetch('destination', destination);

    return trips;
  }
}

module.exports = getTrip;
