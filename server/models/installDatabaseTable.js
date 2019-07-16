/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */

class InstallDatabaseTables {
  async install(dbClient) {
    // todo - create a scheme rather and use app name as namespace
    this._userTable(dbClient);
    this._busTable(dbClient);
    this._tripTable(dbClient);
    this._bookingTable(dbClient);
  }

  async _userTable(dbClient) {
    const userTable = `
			CREATE TABLE IF NOT EXISTS users(
				id SERIAL PRIMARY KEY,
				slug VARCHAR(32) NOT NULL,
				email VARCHAR(100) NOT NULL,
				first_name VARCHAR(20) NOT NULL,
				last_name VARCHAR(20) NOT NULL,
				password TEXT NOT NULL,
				is_admin BOOLEAN NOT NULL,
				date_joined TIMESTAMP NOT NULL
			);
		`;
    await dbClient.query(userTable);
  }

  async _busTable(dbClient) {
    const busTable = `
			CREATE TABLE IF NOT EXISTS buses(
				id SERIAL PRIMARY KEY,
				slug VARCHAR(32) NOT NULL,
				number_plate VARCHAR(16) NOT NULL,
				manufacturer VARCHAR(72) NOT NULL,
				model VARCHAR(72) NOT NULL,
				year VARCHAR(4) NOT NULL,
				capacity INT NOT NULL,
				date_added TIMESTAMP NOT NULL
			);
		`;

    await dbClient.query(busTable);
  }

  async _tripTable(dbClient) {
    const tripTable = `
			CREATE TABLE IF NOT EXISTS trips(
				id SERIAL8 PRIMARY KEY,
				slug VARCHAR(32) NOT NULL,
				bus_slug VARCHAR(32) NOT NULL,
				origin VARCHAR(72) NOT NULL,
				destination VARCHAR(72) NOT NULL,
				trip_date DATE NOT NULL,
				fare FLOAT NOT NULL,
				created_by VARCHAR(32) NOT NULL,
				status VARCHAR(16) NOT NULL,
				date_created TIMESTAMP NOT NULL
			);
		`;
    await dbClient.query(tripTable);
  }

  async _bookingTable(dbClient) {
    const bookinTable = `
			CREATE TABLE IF NOT EXISTS bookings(
				id SERIAL8 PRIMARY KEY,
				slug VARCHAR(32) NOT NULL,
				user_slug VARCHAR(32) NOT NULL,
				trip_slug VARCHAR(32) NOT NULL,
				seat_number int8 NOT NULL,
				created_on TIMESTAMP NOT NULL
			);
		`;

    await dbClient.query(bookinTable);
  }
}

module.exports = InstallDatabaseTables;
