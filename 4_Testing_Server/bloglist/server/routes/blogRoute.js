const router = require('express').Router();
const { blogController } = require('../controllers');

router.get('/', blogController.getAll);
router.get('/:id', blogController.getOne);
router.post('/', blogController.create);
router.put('/:id', blogController.update);
router.delete('/:id', blogController.delete);

module.exports = router;