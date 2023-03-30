const express = require('express');
require('express-async-errors');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

const appRouter = require('./routes');

// ********************************************************
const app = express();
app.use(cors());
morgan.token('info', function (req) { return JSON.stringify(req.body); });
app.use(morgan(
	(tokens, req, res) => {
		return [
			tokens.method(req, res),
			tokens.url(req, res),
			tokens.status(req, res),
			tokens.res(req, res, 'content-length'),
			'-',
			tokens['response-time'](req, res),
			'ms',
			tokens.info(req, res),
		].join(' ');
	}
));
app.use(express.json());

mongoose
	// eslint-disable-next-line no-undef
	.connect(process.env.MONGODB_URI)
	.then(() => { console.log('MongoDB connected!'); })
	.catch((error) => {
		console.error('error connecting to MongoDB:', error.message);
	});

app.use('/api', appRouter);

// eslint-disable-next-line no-undef
app.listen(process.env.PORT, () => {
// eslint-disable-next-line no-undef
	console.log(`Server running on port ${process.env.PORT}`);
});

module.exports = app;
