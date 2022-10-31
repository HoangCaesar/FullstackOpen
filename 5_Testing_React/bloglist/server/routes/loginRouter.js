const router = require('express').Router();
const { loginController } = require('../controllers');
const { verifyToken } = require('../utils/checkToken');

router.post('/', loginController.login);
router.post(
    '/check-token', 
    verifyToken, 
    (req, res) => {
        res.status(200).json('Authorized');
    }
);

module.exports = router;