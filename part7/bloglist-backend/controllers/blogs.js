const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', {
      username: true,
      name: true,
      id: true
    })
    response.json(blogs.map(blog => blog.toJSON()))
  } catch (exception) {
    next(exception)
  }
})

blogRouter.get('/:id', async (request, response, next) => {
  try {
    const requestedBlog = await (
      await Blog.findById(request.params.id)
    ).populate('user', {
      username: true,
      name: true,
      id: true
    })

    if (requestedBlog) {
      response.json(requestedBlog.toJSON())
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
})

blogRouter.post('/', async (request, response, next) => {
  try {
    const { body, token } = request

    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id
    })

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()

    const responseBlog = await Blog.findById(savedBlog.id).populate('user', {
      username: true,
      name: true,
      id: true
    })
    response.status(201).json(responseBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

blogRouter.delete('/:id', async (request, response, next) => {
  try {
    const { params, token } = request

    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(params.id)

    if (user.id.toString() === blog.user.toString()) {
      await Blog.findByIdAndRemove(params.id)
      response.status(204).end()
    } else {
      response.status(401).json({
        error: 'this user does not have permissiong to delete this blog'
      })
    }
  } catch (exception) {
    next(exception)
  }
})

blogRouter.put('/:id', async (request, response, next) => {
  try {
    updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true }
    ).populate('user', {
      username: true,
      name: true,
      id: true
    })

    response.status(200).json(updatedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogRouter
