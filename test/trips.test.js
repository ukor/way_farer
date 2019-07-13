/* eslint-disable prefer-arrow-callback */
require('dotenv').config();
const chai = require('chai');
const chaiaspromised = require('chai-as-promised');
const chaiThings = require('chai-things');
const { expect } = chai;
const { Pool } = require('pg');
const Trip = require('../server/models/trip.js');
const { trip } = require('./__dummyData.js');
const pgConnection = require('pg-connection-string').parse;
const slug = require('shortid');
const { env } = process;

chai.use(chaiThings).use(chaiaspromised);

describe('Test Trips Logic ', function () {

	let dbPool;
	let dummyTrip = trip;
	before(async function () {
		const dbURI = `postgres://${env.PGuser}:${env.PGpassword}@${env.PGhost}:${env.PGport}/${env.PGdatabaseName}`;
		const dbConfig = pgConnection(dbURI);
		dbPool = new Pool(dbConfig);
	});

	describe(' Test saving trips ', function () {
		it('Expect return value to be a truthy value', async function () {
			const trp = new Trip(dbPool).save(dummyTrip);
			await expect(trp).to.eventually.be.a('number');
		});

		it('Expect an error to be thrown', async function () {
			delete dummyTrip.slug;
			const trp = new Trip(dbPool).save(dummyTrip);
			await expect(trp).to.eventually.be.rejected;
		});
	});
	describe(' Test fetching trips ', function () {
		it('Expect return value to be an object', async function () {
			const trp = new Trip(dbPool).fetch('origin', dummyTrip.origin);
			await expect(trp).to.eventually.be.an('array');
		});

		// it('Expect return value to be an object with id, slug and origin as property', async function () { });

		// it('Expect an error to be thrown ', async function () { });
	});
	describe(' Test removing trips ', function () {
		it('Expect return value to be a thruthy value ', async function () {
			const removeTrip = new Trip(dbPool).remove(dummyTrip.slug);
			await expect(removeTrip).to.eventually.be.a('number');
		 });
	});
});
