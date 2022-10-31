const router = require('express').Router();

router.use('/blogs', require('./blogRoute'));
router.use('/users', require('./userRoute'));
router.use('/login', require('./loginRouter'));

module.exports = router;