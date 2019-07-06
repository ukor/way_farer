require('dotenv').config();
const chai = require('chai');
const chaiaspromised = require('chai-as-promised');
const chaiThings = require('chai-things');
chai.use(chaiThings).use(chaiaspromised);
const expect = chai.expect;
const { Pool } = require('pg');
const user = require('../server/models/user.js');
const signup = require('../server/models/signup.js');
const signIn = require('../server/models/signin.js');
const dummyData = require('./__dummyData.js');
const signupValidator = require('../server/middlewares/validators/signup.js');
const signinValidator = require('../server/middlewares/validators/signin.js');
const { env } = process;
const pgConnection = require('pg-connection-string').parse;
const slug = require('shortid');

describe('Test User interations', function () {
	let dbPool;
	let dummyUser = signupValidator(dummyData.signup);
	before(async function () {
		const dbURI = `postgres://${env.PGuser}:${env.PGpassword}@${env.PGhost}:${env.PGport}/${env.PGdatabaseName}`;
		const dbConfig = pgConnection(dbURI);
		dbPool = new Pool(dbConfig);
	});

	after(async function () { });

	describe('Database', function () {
		describe('Add new user to the database', async function () {
			it('expect return value to be a number and truthy', async function () {
				let addUser = new user(dummyUser).add(dbPool);
				await expect(addUser).to.eventually.be.a('number');
			});
		});

		describe('Fetch user from database', async function () {
			it('expect return value to be of type array', async function () {
				let getUser = new user(1).fetch('id', dbPool);
				await expect(getUser).to.eventually.be.an('array');
			});
		});
		describe('Count number of user in the database', async function () {
			it('Expect return value to be of type number', async function () {
				let countUser = new user(null).count(dbPool);
				await expect(countUser).to.eventually.be.a('number');
			});
		});

		describe('Delete user from database', async function () {
			it('expect return value to be a truthy value', async function () {
				let removeUser = new user(1).remove(dbPool);
				await expect(removeUser).to.eventually.be.a('number');
			});
		});

	});

	describe('Sign up', function () {
		it('Expect return value to be an object', async function () {
			dummyUser = signupValidator({
				first_name: `${slug.generate()}`,
				last_name: `${slug.generate()}`,
				email: `${slug.generate()}@gmail.test`,
				password: `${slug.generate()}`
			});
			let s = new signup(dummyUser, dbPool).register();
			await expect(s).to.eventually.be.an('object');
		});
		it('Expect an error to be thrown - `Email already in use`', async function () {
			let s = new signup(dummyUser, dbPool).register();
			await expect(s).to.eventually.be.rejected;
		});
		it('Expect return value to have isAdmin, token, and userId as property', async function () {
			dummyUser = signupValidator({
				first_name: `${slug.generate()}`,
				last_name: `${slug.generate()}`,
				email: `${slug.generate()}@gmail.test`,
				password: `${slug.generate()}`
			});
			let s = new signup(dummyUser, dbPool).register();
			await expect(s).to.eventually.have.property('isAdmin');
			await expect(s).to.eventually.have.property('token');
			await expect(s).to.eventually.have.property('userId');
		});
	});

	describe('Sign In', function () {
		it('Expect return value to be an object', async function () {
			let s = new signIn({
				email: dummyUser.email,
				password: dummyUser.password
			}, dbPool).authorize();
			await expect(s).to.eventually.be.an('object');
		});
		it('Expect an error to be thrown - `Email not found`', async function () {
			let s = new signIn({
				email: 'no_email@like.this',
				password: 'wrong_password'
			}, dbPool).authorize();
			await expect(s).to.eventually.be.rejected;
		});
		it('Expect return value to have isAdmin, token, and userId as property', async function () {

			let s = new signin({
				email: dummyUser.email,
				password: dummyUser.password
			}, dbPool).authorize();
			await expect(s).to.eventually.have.property('isAdmin');
			await expect(s).to.eventually.have.property('token');
			await expect(s).to.eventually.have.property('userId');
		});
	});
})