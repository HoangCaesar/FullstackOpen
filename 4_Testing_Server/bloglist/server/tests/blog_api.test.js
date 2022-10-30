const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const Blog = require('../models/blogModel');
const app = require('../app');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  console.log('cleared');

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog));
  const promiseArray = blogObjects.map(blog => blog.save());
  await Promise.all(promiseArray);
});

describe('Get blog info', () => {
  test('blogs are returned as json', async () => {
    console.log('entered test');
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  }, 100000);

  test('there are two blogs', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('the first blog is about Fullstack developer', async () => {
    const response = await api.get('/api/blogs');
    const titles = response.body.map(r => r.title);
    expect(titles).toContain(
      'How to become a fullstack developer?'
    );
  });
  test('unique identifier property of the blog is by default _id', async () => {
    const blogs = await Blog.find({});
    expect(blogs[0]._id).toBeDefined();
  });

  test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb();

    const blogToView = blogsAtStart[0];
    console.log(blogToView);

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const processedBlogToView = JSON.parse(JSON.stringify(blogToView));

    expect(resultBlog.body).toEqual(processedBlogToView);
  });
});

describe('Addition of a new blog', () => {
  test('a valid blog can be added', async () => {
    const newblog = {
      'title': 'How to fluently speaking English?',
      'author': 'Hoang',
      'url': 'https://hoangyeudoi.com/',
      'likes': 1000,
      'date': new Date()
    };

    await api
      .post('/api/blogs')
      .send(newblog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map(n => n.title);
    expect(titles).toContain(
      'How to fluently speaking English?'
    );
  });

  test('blog missing content is not added', async () => {
    const newblog = {
      'author': 'Hoang',
      'url': 'https://hoangyeudoi.com/',
      'likes': 1000,
      'date': new Date()
    };

    await api
      .post('/api/blogs')
      .send(newblog)
      .expect(400);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });

  test('blog without likes properties will be added with likes = 0', async () => {
    const newblog = {
      'title': 'How to fluently speaking English?',
      'author': 'Hoang',
      'url': 'https://hoangyeudoi.com/',
      'date': new Date()
    };

    await api
      .post('/api/blogs')
      .send(newblog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const zerolikeBlog = blogsAtEnd.find(n => n.title === 'How to fluently speaking English?');
    expect(zerolikeBlog.likes).toBe(0);
  });

  test('if blog missing tittle or url properties, responds 400 bad requests', async () => {
    const newblog = {
      'author': 'Hoang',
      'likes': 1000,
      'date': new Date()
    };

    await api
      .post('/api/blogs')
      .send(newblog)
      .expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});

describe('Update of a blog', () => {
  test('likes property a blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];
    blogToUpdate.likes = null; 
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200);

    const blogsAtEnd = await helper.blogsInDb();

    const updatedBlog = blogsAtEnd.find(r => r.title === blogToUpdate.title);

    expect(updatedBlog.likes).toBe(blogToUpdate.likes || 0);
  });
});

describe('Delettion of a blog', () => {
  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    );

    const titles = blogsAtEnd.map(r => r.title);

    expect(titles).not.toContain(blogToDelete.title);
  });
});

afterAll(() => {
  mongoose.connection.close();
});