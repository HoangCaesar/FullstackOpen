require('dotenv').config();
const router = require('express').Router();

router.use('/blogs', require('./blogRoute'));
router.use('/users', require('./userRoute'));
router.use('/login', require('./loginRouter'));

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'test') {
// eslint-disable-next-line no-undef
    router.use('/testing', require('./testingRoute'));
}

module.exports = router;