const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const app = express();

if (process.env.NODE_ENV === 'production') {
	app.use(helmet());
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', async (request, response) => {
	response.sendStatus(200);
});

module.exports = app;