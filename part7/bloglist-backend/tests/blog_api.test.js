const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('when there is initially some blogs saved', () => {
  describe('requesting blogs', () => {
    test('blogs are returned as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('blog unique identifier is named id', async () => {
      const response = await api.get('/api/blogs')
      expect(response.body[0].id).toBeDefined()
    })

    test('requesting a specific blog', async () => {
      const blogs = await helper.blogsInDB()

      const requestdBlog = await api
        .get(`/api/blogs/${blogs[0].id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(requestdBlog.body).toEqual(blogs[0])
    })
  })

  describe('posting new blogs', () => {
    test('new blog can be posted', async () => {
      const newBlog = {
        title: 'New Test Blog',
        author: 'Me',
        url: 'blog.com',
        likes: 1
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogAtEnd = await helper.blogsInDB()
      expect(blogAtEnd.length).toBe(helper.initialBlogs.length + 1)

      const { id, ...blogWithNoId } = blogAtEnd[blogAtEnd.length - 1]
      expect(blogWithNoId).toEqual(newBlog)
    })

    test('new blog without likes default to 0', async () => {
      const newBlog = {
        title: 'New Test Blog',
        author: 'Me',
        url: 'blog.com'
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogAtEnd = await helper.blogsInDB()
      const postedBlog = blogAtEnd[blogAtEnd.length - 1]
      expect(postedBlog.likes).toBe(0)
    })

    test('blog error when blog has no title or url', async () => {
      const blogNoTitle = {
        author: 'Me',
        url: 'blog.com'
      }

      const blogNoUrl = {
        title: 'Newe Blog',
        author: 'Me'
      }

      const blogWithNoUrlAndTitle = {
        author: 'Me'
      }

      await api
        .post('/api/blogs')
        .send(blogNoTitle)
        .expect(400)

      await api
        .post('/api/blogs')
        .send(blogNoUrl)
        .expect(400)

      await api
        .post('/api/blogs')
        .send(blogWithNoUrlAndTitle)
        .expect(400)
    })
  })

  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const initialBlogs = await helper.blogsInDB()
      await api.delete(`/api/blogs/${initialBlogs[0].id}`).expect(204)

      const blogsAtEnd = await helper.blogsInDB()
      expect(blogsAtEnd.length).toBe(initialBlogs.length - 1)

      const blogIds = blogsAtEnd.map(blog => blog.id)
      expect(blogIds).not.toContain(initialBlogs[0].id)
    })
  })

  describe('updating a blog', () => {
    test('succeeds with status code 200', async () => {
      const initialBlogs = await helper.blogsInDB()
      const blogToUpdate = {
        ...initialBlogs[0],
        title: 'This blog has been updated'
      }
      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(200)

      const updatedBlog = await api.get(`/api/blogs/${blogToUpdate.id}`)
      expect(updatedBlog.body).toEqual(blogToUpdate)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})
