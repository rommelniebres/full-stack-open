const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'First blog',
    author: 'Myself',
    url: 'myblog.com',
    likes: 5,
  },
  {
    title: 'Second blog',
    author: 'Myself',
    url: 'myblog.com',
    likes: 5,
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'Temporary blog', author: 'Temporary', url: 'Temporary.com', likes: 0, })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogInDb, usersInDb
}