const jwt = require('jsonwebtoken');
const { User } = require('../models');

const decodeToken = req => {
    const authorization = req.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        const token = authorization.substring(7);
        const tokenDecoded = jwt.verify(
            token,
            // eslint-disable-next-line no-undef
            process.env.JSON_SECRET_KEY
        );
        return tokenDecoded;
    } else {
        return null;
    }
};

exports.verifyToken = async (req, res, next) => {
    const tokenDecoded = decodeToken(req);

    if (tokenDecoded) {
        const user = await User.findById(tokenDecoded.id);
        if (!user) res.status(403).json('Unauthorized');
        req.user = user;
        next();
    } else {
        res.status(401).json('Token missing or invalid');
    }
};