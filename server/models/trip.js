/* eslint-disable quotes */
/* eslint-disable no-else-return */
class Trip {
  constructor(dbClient) {
    this.dbClient = dbClient;
  }

  async save(tripDetails) {
    this.td = tripDetails;
    const sql = 'INSERT INTO trips(slug, bus_slug, origin, destination, trip_date, fare, created_by, status, date_created) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
    const values = [
      this.td.slug,
      this.td.bus_slug,
      this.td.origin,
      this.td.destination,
      this.td.trip_date,
      this.td.fare,
      this.td.created_by,
      this.td.status,
      this.td.date_created,
    ];

    const query = await this.dbClient.query(sql, values);

    return query.rowCount;
  }

  beforeFetch(filterType) {
    this.ft = filterType;
    if (this.ft === 'origin') {
      return `SELECT * FROM trips WHERE origin = $1`;
    }
    if (this.ft === 'destination') {
      return `SELECT * FROM users WHERE destination = $1`;
    } else if (this.ft === 'id') {
      return `SELECT * FROM trips WHERE slug = $1`;
    } else {
      return `SELECT * FROM trips WHERE bus_slug = $1`;
    }
  }

  async fetch(filterType = 'origin' || 'destination' || 'id' || 'bus', filter) {
    this.filter = filter;
    const sql = this.beforeFetch(filterType);
    const values = [filter];

    const query = await this.dbClient.query(sql, values);

    return query.rows;
	}

	async cancel(trip_id) {
		this.trip_id = trip_id;

		const sql = `UPDATE trips SET status = ($1) WHERE slug = ($2)`;
		const values = ['cancel', this.trip_id];

		const query = await this.dbClient.query(sql, values);
		console.log('qwerty =>> ', query, query.rowCount, typeof query.rowCount);
		return query.rowCount;
	}

  update(trip_id, data) {
    this.ft = trip_id;
		this.ud = data;
  }

  async remove(filter) {
    this.filter = filter;
    const sql = `DELETE FROM trips WHERE slug = $1`;
    const values = [this.filter];

    const query = await this.dbClient.query(sql, values);

    return query.rowCount;
  }
}

module.exports = Trip;
