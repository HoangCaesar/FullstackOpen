require('dotenv').config();
const router = require('express').Router();

router.use('/anecdotes', require('./anecdoteRoute'));

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'test') {
// eslint-disable-next-line no-undef
    router.use('/testing', require('./testingRoute'));
}

module.exports = router;