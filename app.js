const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const databaseTables = require('./server/models/installDatabaseTable.js');
const routes = require('./server/routes/index.js');

const { Pool } = require('pg');
const { env } = process;

const app = express();

(async function(){
	const dev_test = `postgres://${env.PGuser}${env.PGpassword ? ':'+env.PGpassword : ''}@${env.PGhost}:${env.PGport}/${env.PGdatabaseName}`;

	const connectionString = env.NODE_ENV === 'production' ? env.DATABASE_URL : dev_test;

	const dbPool = new Pool({connectionString});

	/** Create a single database instace for the entire app
	 * @see https://node-postgres.com/features/pooling
	 * The preffered way to query
	 * @see https://node-postgres.com/features/pooling#single-query
	 */
	app.locals.dbClient = dbPool;

	await new databaseTables().install(dbPool);
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