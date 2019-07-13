const slug = require('shortid');
const moment = require('moment');
module.exports = {
	adminUser: {
		first_name: 'Admin',
		last_name: 'User',
		email: 'adminUser@gmail.test',
		password: 'testPassword',
	},
	adminSignIn: {
		email: 'adminUser@gmail.test',
		password:  'testPassword',
	},
	signup: {
		first_name: `${slug.generate()}`,
		last_name: `${slug.generate()}`,
		email: `${slug.generate()}@gmail.test`,
		password: `${slug.generate()}`,
	},
	signIn: {
		email: 'example@gmail.test',
		password: 'password',
  },
  trip: {
    slug: slug.generate(),
    bus_slug: slug.generate(),
    origin: 'Abakaliki',
    destination: 'Asaba',
    trip_data: new Date(),
    fare: 2500,
    created_by: slug.generate(),
    status: 'active',
    date_created: moment().utc().format(''),
	},
	tripByAdmin: {
    slug: slug.generate(),
    bus_slug: slug.generate(),
    origin: 'Abakaliki',
    destination: 'Asaba',
    trip_date: new Date(),
    fare: 2500,
    created_by: slug.generate(),
    status: 'active',
    date_created: moment().utc().format('YYYY/MM/DD HH:mm:ss'),
	},
	busByAdmin: {},
};
