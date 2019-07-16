class Booking {
  constructor(dbClient) {
    this.dbClient = dbClient;
  }

  async save(bookingDetails) {
    const sql = 'INSERT INTO bookings(slug, user_slug, trip_slug, seat_number, created_on) VALUES ($1, $2, $3, $4, $5)';
    const values = [
      bookingDetails.slug,
      bookingDetails.user_slug,
      bookingDetails.trip_slug,
      bookingDetails.seat_number,
      bookingDetails.created_on,
    ];

    const query = await this.dbClient.query(sql, values);

    return query.rowCount;
  }

  async userFetch(userId) {
    const sql = 'SELECT * FROM bookings WHERE user_slug = $1';
    const values = [userId];

    const query = await this.dbClient.query(sql, values);

    return query.rows;
  }

  async adminFetch() {
    const sql = 'SELECT * FROM bookings WHERE user_slug > 0';

    const query = await this.dbClient.query(sql);

    return query.rows;
  }
}

module.exports = Booking;
