const { Anecdote } = require('../models');

exports.getAll = async (req, res) => {
    const list = await Anecdote.find({}).sort({ createdAt: -1 });
    res.status(200).json(list);
};

exports.create = async (req, res) => {
    const { content, id, votes} = req.body;

    const user = await Anecdote.findOne({ id });
    if (user) return res.status(400).json({
        error: 'This id has been used already'
    });

    if (content.length < 5) res.status(400).json({ error: 'Content must be at least 5 characters' });

    const newAnecdote = new Anecdote({
        content,
        id,
        votes
    });

    const savedAnecdote = await newAnecdote.save();

    res.status(201).json(savedAnecdote);
};

exports.getOne = async (req, res) => {
    const anecdote = await Anecdote.findById(req.params.id);
    console.log(anecdote[0]);
    res.status(200).json(anecdote);
};

exports.updateOne = async (req, res) => {
    const anecdote = await Anecdote.findByIdAndUpdate(req.params.id, {
        $set: req.body
    });
    res.status(200).json(anecdote);
};
