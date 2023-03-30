const router = require('express').Router();
const { anecdoteController } = require('../controllers');

router.get('/', anecdoteController.getAll);
router.post('/', anecdoteController.create);
router.get('/:id', anecdoteController.getOne);
router.patch('/:id', anecdoteController.updateOne);

module.exports = router;