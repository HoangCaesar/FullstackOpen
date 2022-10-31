const { User, Blog } = require('../models');

const initialBlogs = [
    {
        'title': 'How to become a fullstack developer?',
        'author': 'Caesar',
        'url': 'https://hoangyeudoi.com/',
        'likes': 300,
        'date': new Date()
    },
    {
        'title': 'Typescript or Javascript?',
        'author': 'Caesar',
        'url': 'https://hoangyeudoi.com/',
        'likes': 200,
        'date': new Date()
    }
];

const nonExistingId = async () => {
    const blog = new Blog({ content: 'willremovethissoon', date: new Date() });
    await blog.save();
    await blog.remove();

    return blog._id.toString();
};

const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map(blog => blog.toJSON());
};

const usersInDb = async () => {
    const users = await User.find({});
    return users;
};

module.exports = {
    initialBlogs, nonExistingId, blogsInDb, usersInDb
};