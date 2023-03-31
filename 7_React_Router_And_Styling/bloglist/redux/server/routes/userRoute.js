const router = require('express').Router();
const { userController } = require('../controllers');

router.get('/', userController.getAll);
router.get('/:id', userController.getOne);
router.post('/', userController.create);

module.exports = router;