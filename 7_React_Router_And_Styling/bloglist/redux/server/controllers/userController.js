const { User } = require('../models');
const bcrypt = require('bcrypt');

exports.getAll = async (req, res) => {
    const list = await User.find({}).sort({ createdAt: -1 }).populate('blogs', { title: 1, date: 1 });
    res.status(200).json(list);
};

exports.create = async (req, res) => {
    const { username, name, password } = req.body;

    const user = await User.findOne({ username });
    if (user) return res.status(400).json({
        error: 'This username has been used already'
    });

    if (password.length < 5) res.status(400).json({ error: 'Password must be at least 5 characters' });

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
        username,
        name,
        passwordHash
    });

    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
};