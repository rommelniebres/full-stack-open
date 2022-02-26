const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blog = await Blog.find({}).populate('user')
  response.json(blog)
})

blogsRouter.get('/:id', async (request, response) => {
  if (request.params.id.length < 24) {
    return response.status(400).end()
  }

  const blog = await Blog.findById(request.params.id)

  blog
    ? response.json(blog.toJSON())
    : response.status(404).end()
})

blogsRouter.post('/', async (request, response) => {
  if (!request.token || !request.user_id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const body = request.body
  const user = request.user

  if (body.title && body.url) {
    if (body.likes) {
      body.likes
    } else {
      body.likes = 0
    }
  } else {
    return response.status(400).end()
  }
    
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })
  
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.json(savedBlog.toJSON())
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  if (body.title && body.url) {
    if (body.likes) {
      body.likes
    } else {
      body.likes = 0
    }
  } else {
    return response.status(400).end()
  }

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => { 
  if (!request.token || !request.user_id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() !== user._id.toString()) {
    return response.status(401).json({ error: 'Not Authorized to delete blogs that you do not own' })
  }

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter