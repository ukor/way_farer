const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const databaseTables = require('./server/models/installDatabaseTable.js');
const routes = require('./server/routes/index.js');
const pgConnection = require('pg-connection-string');

const { Pool } = require('pg');
const { env } = process;

const app = express();

(async function() {
	const dev_test = `postgres://${env.PGuser}:${env.PGpassword}@${env.PGhost}:${env.PGport}/${env.PGdatabaseName}`;

	const connectionString =
	env.NODE_ENV === 'production' ? env.DATABASE_URL : dev_test;
	const dbConfig = connectionString(connectionString).parser;

	try {
		const dbPool = new Pool(dbConfig);

		/** Create a single database instace for the entire app
		 * @see https://node-postgres.com/features/pooling
		 * The preffered way to query
		 * @see https://node-postgres.com/features/pooling#single-query
		 */
		app.locals.dbClient = dbPool;

		await new databaseTables().install(dbPool);
		console.log('string => ', dbConfig);
		console.log('database => ', dbPool);
	} catch (exception) {
		console.log(exception);
	}
})();

if (env.NODE_ENV === 'production') {
	app.use(helmet());
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', async (request, response) => {
	response.sendStatus(200);
});

routes(app);

module.exports = app;
