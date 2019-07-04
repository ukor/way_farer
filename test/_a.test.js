require('dotenv').config();
const chai = require('chai');
const chaiaspromised = require('chai-as-promised');
const chaiThings = require('chai-things');
chai.use(chaiThings).use(chaiaspromised);
const expect = chai.expect;
const { Pool } = require('pg');
const { env } = process;

const pgConnection = require('pg-connection-string').parse;

describe('Test User interations', function () {
	let dbPool;
	before(async function () {
		const dbURI = `postgres://${env.PGuser}:${env.PGpassword}@${env.PGhost}:${env.PGport}/${env.PGdatabaseName}`;
		const dbConfig = pgConnection(dbURI);
		dbPool = new Pool(dbConfig);

		await new databaseTables().install(dbPool);
	});

	after(async function () { });

	describe('Init Database', function () {
		expect(1).to.be.a('number');
	});
})