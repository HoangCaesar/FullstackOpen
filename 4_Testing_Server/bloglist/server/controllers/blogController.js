const Blog = require('../models/blogModel');

exports.getAll = async (req, res) => {
	const list = await Blog.find({}).sort({ createdAt: -1 });

	res.status(200).json(list);
};

exports.getOne = async (req, res) => {
	const blog = await Blog.findById(req.params.id);
	if (blog) {
		res.status(200).json(blog);
	} else {
		res.status(404).end();
	}
};

exports.create = async (req, res) => {
	const { title, author, url, likes } = req.body;
	const info = await Blog.findOne({ title, author });
	if (info) return res.status(403).json('This title has been used already, please try another.');

	if (!likes) {
		const newBlog = new Blog({ ...req.body, likes: 0, date: new Date() });
		await newBlog.save();
		res.status(201).json('Create a new blog successfully!');
		return;
	} else if (!title || !url) {
		res.status(400).end();
		return;
	}
	const newBlog = new Blog({ ...req.body, date: new Date() });
	await newBlog.save();
	res.status(201).json('Create a new blog successfully!');
};

exports.update = async (req, res) => {
	const { title, author, likes } = req.body;
	const info = await Blog.findOne({ title, author });
	if (!info) return res.status(403).json('This blog does not exist');
	
	if (!likes) {
		await Blog.findByIdAndUpdate(req.params.id, { ...req.body, likes: 0 }, { new: true });
		return res.status(200).json('Updated');
	}
	await Blog.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });
	res.status(200).json('Updated');
};

exports.delete = async (req, res) => {
	await Blog.findByIdAndDelete(req.params.id);
	res.status(204).end();
};

