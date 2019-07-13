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
    password: 'testPassword',
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
    bus_id: slug.generate(),
    bus_slug: slug.generate(),
    origin: 'Abakaliki',
    destination: 'Asaba',
    trip_date: moment()
      .utc()
      .format('YYYY/MM/DD HH:mm:ss'),
    fare: 2500,
    created_by: slug.generate(),
    user_id: slug.generate(),
    status: 'active',
    date_created: moment()
      .utc()
      .format('YYYY/MM/DD HH:mm:ss'),
  },
  tripByAdmin: {
    slug: slug.generate(),
    bus_id: slug.generate(),
    bus_slug: slug.generate(),
    origin: 'Abakaliki',
    destination: 'Asaba',
    trip_date: moment()
      .utc()
      .format('YYYY/MM/DD HH:mm:ss'),
    fare: 2500,
    created_by: slug.generate(),
    user_id: slug.generate(),
    status: 'active',
    is_admin: true,
    date_created: moment()
      .utc()
      .format('YYYY/MM/DD HH:mm:ss'),
  },
  busByAdmin: {},
};
