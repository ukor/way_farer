
class User{
	/**
	 * Creates an instance of User.
	 * @param {Object || string} [userDetails= {} || ''] - Object when inserting, string for other operations
	 * @memberof User
	 */
	constructor(userDetails = {} || '') {
		this.userDetails = userDetails;
	}

	/**
	 * Insert user into database
	 *
	 * @param {Object} dbClient
	 * @returns { Number } 1 when operation is successfull and 0 when operation fails
	 * @memberof User
	 */
	async add(dbClient) {

		const sql = `INSERT INTO users(slug, email, firstName, lastName, password, isAdmin, dateJoined) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
		const values = [
			this.userDetails['slug'], this.userDetails['email'],
			this.userDetails['firstName'], this.userDetails['lastName'],
			this.userDetails['password'], this.userDetails['isAdmin'],
			this.userDetails['dateJoined']
		];

		let query = await dbClient.query(sql, values);

		return query.rowCount;
	}

	/**
	 * Counts the number of users in the database
	 *
	 * @param {Object} dbClient - Database connection Object
	 * @returns [Number]
	 * @memberof User
	 */
	async count(dbClient) {
		const sql = `SELECT COUNT(*) FROM users WHERE id > 0`;

		let query = await dbClient.query(sql);
		console.log('count => ', query.rows[0].count);

		return query.rows[0].count;
	}

	/**
	 * @private
	 * Returns SQL base on filter
	 *
	 * @param {String} filter
	 * @returns [String]
	 * @memberof User
	 */
	_fetchFilter(filter) {
		if (filter === 'id') {
			return `SELECT * FROM users WHERE id = $1`;
		} else if (filter === 'email') {
			return `SELECT * FROM users WHERE email = $1`;
		} else {
			return `SELECT * FROM users WHERE slug = $1`;
		}
	}

	/**
	 * Fetches user from the database
	 *
	 * @param {string} [filter='id' || 'email' || 'slug']
	 * @param {Object} dbClient
	 * @returns [Array]
	 * @memberof User
	 */
	async fetch(filter = 'id' || 'email' || 'slug', dbClient) {

		const sql = this._fetchFilter(filter);
		const values = [this.userDetails];

		let query = await dbClient.query(sql, values);

		return query.rows;
	}

	async remove(dbClient) {
		const sql = `DELETE FROM users WHERE slug = $1`;
		const values = [this.userDetails];

		let query = await dbClient.query(sql, values);

		return query.rowCount;
	}

}

module.exports = User;
