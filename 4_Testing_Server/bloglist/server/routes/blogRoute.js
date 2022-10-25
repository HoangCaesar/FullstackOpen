const router = require('express').Router();
const { blogController } = require('../controllers');

router.get('/', blogController.getAll);
router.post('/', blogController.create);

module.exports = router;