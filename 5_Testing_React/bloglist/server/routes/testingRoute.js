const router = require('express').Router();
const { testingController } = require('../controllers');

router.post('/reset', testingController.reset);

module.exports = router;