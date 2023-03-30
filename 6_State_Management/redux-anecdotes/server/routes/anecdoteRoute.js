const router = require('express').Router();
const { anecdoteController } = require('../controllers');

router.get('/', anecdoteController.getAll);
router.post('/', anecdoteController.create);

module.exports = router;