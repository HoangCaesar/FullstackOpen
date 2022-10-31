const router = require('express').Router();
const { blogController } = require('../controllers');
const { verifyToken } = require('../utils/checkToken');

router.get('/', blogController.getAll);
router.get('/:id', blogController.getOne);
router.post('/', verifyToken, blogController.create);
router.put('/:id', blogController.update);
router.delete('/:id', verifyToken, blogController.delete);

module.exports = router;