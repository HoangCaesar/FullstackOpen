const { Blog } = require('../models');

exports.getAll = async (req, res) => {
	const list = await Blog.find({}).sort({ createdAt: -1 }).populate('user', { username: 1, name: 1 });
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
	const user = req.user;

	const info = await Blog.findOne({ title, author });
	if (info) return res.status(403).json('This title has been used already, please try another.');

	if (!likes) {
		const newBlog = new Blog({ ...req.body, likes: 0, user: user._id, date: new Date() });
		const savedBlog = await newBlog.save();
		user.blogs = user.blogs.concat(savedBlog._id);
		return res.status(201).json('Create a new blog successfully!');
	} else if (!title || !url) {
		return res.status(400).end();
	}
	console.log(user);
	const newBlog = new Blog({ ...req.body, user: user._id, date: new Date() });

	await newBlog.save();
	const savedBlog = await newBlog.save();

	user.blogs = user.blogs.concat(savedBlog._id);
	await user.save();
	res.status(201).json('Create a new blog successfully!');
};

exports.update = async (req, res) => {
	const { title, author, likes, user } = req.body;
	const info = await Blog.findOne({ title, author });
	if (!info) return res.status(403).json('This blog does not exist');

	if (!likes) {
		await Blog.findByIdAndUpdate(req.params.id, { ...req.body, likes: 0 }, { new: true });
		return res.status(200).json('Updated');
	}
	await Blog.findByIdAndUpdate(req.params.id, { ...req.body, user: user.id }, { new: true });
	res.status(200).json('Updated');
};

exports.delete = async (req, res) => {
	const user = req.user;
	const blog = await Blog.findById(req.params.id);
	if ((blog.user.toString() !== user._id.toString()))
		return res.status(403).json('Not allowed!');

	await Blog.findByIdAndDelete(req.params.id);
	res.status(204).end();
};

