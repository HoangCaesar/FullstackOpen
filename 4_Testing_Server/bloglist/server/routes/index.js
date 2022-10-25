const router = require('express').Router();

router.use('/blogs', require('./blogRoute'));

module.exports = router;