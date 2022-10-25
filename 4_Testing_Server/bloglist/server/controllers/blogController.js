const Blog = require('../models/blogModel');
const middleware = require('../utils/middleware');

exports.getAll = async (req, res) => {
	try {
		const list = await Blog.find({}).sort({ createdAt: -1 });

		res.status(201).json(list);
	}
	catch (err) {
		middleware.errorHandler(err);
		res.status(500).json(err);
	}
};

exports.create = async (req, res) => {
	const { title, author } = req.body;
	console.log(1);
	try {
		const info = await Blog.findOne({ title, author });
		if (info) return res.status(403).json('This title has been used already, please try another.');

		const newBlog = new Blog({ ...req.body, date: new Date() });
		await newBlog.save();
		res.status(201).json('Create a new blog successfully!');
	}
	catch (err) {
		middleware.errorHandler(err);
		res.status(500).json(err);
	}
};

