const express = require('express');
require('express-async-errors');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

const appRouter = require('./routes');
const middleware = require('./utils/middleware');
const config = require('./utils/config');
const logger = require('./utils/logger');

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
app.use(middleware.requestLogger);

mongoose
	.connect(config.MONGODB_URI)
	.then(() => { logger.info('MongoDB connected!'); })
	.catch((error) => {
		logger.error('error connecting to MongoDB:', error.message);
	});

app.use('/api', appRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

app.listen(config.PORT, () => {
	logger.info(`Server running on port ${config.PORT}`);
});

module.exports = app;
