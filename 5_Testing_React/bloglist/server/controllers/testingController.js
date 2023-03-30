const { User,Blog } = require('../models');

exports.reset = async (req, res) => {
    await Blog.deleteMany({});
    await User.deleteMany({});

    res.status(204).end();
};