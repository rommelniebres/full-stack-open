const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcryptjs')

const Blog = require('../models/blog')
const User = require('../models/user')

const admin_token = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvbW1lbCIsImlkIjoiNjE4ZDFhZjY0NWRiMTlhZGZjMTNhNDM1IiwiaWF0IjoxNjM2NzA5NDA1fQ.6zXTReKhyIHXrGdB8pdYQAA1dsp6Vnh_HmlaaWEcN_c'

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .set({ Authorization: admin_token })
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api
      .get('/api/blogs')
      .set({ Authorization: admin_token })
  
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api
      .get('/api/blogs')
      .set({ Authorization: admin_token })

    const title = response.body.map(blog => blog.title)

    expect(title).toContain(
      'First blog'
    )
  })
})

describe('viewing a specific blog', () => {
  test('succeeds with a valid id', async () => {
    const blogAtStart = await helper.blogInDb()

    const blogToView = blogAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .set({ Authorization: admin_token })
      .expect(200)
      .expect('Content-Type', /application\/json/)
      
    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

    expect(resultBlog.body).toEqual(processedBlogToView)
  })

  test('fails with statuscode 404 if blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    await api
      .get(`/api/blogs/${validNonexistingId}`)
      .set({ Authorization: admin_token })
      .expect(404)
  })

  test('fails with statuscode 400 id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .get(`/api/blogs/${invalidId}`)
      .set({ Authorization: admin_token })
      .expect(400)
  })
})

describe('addition of a new blog', () => {
  test('there is a id property', async() => {
    const blogAtEnd = await helper.blogInDb()
    expect(blogAtEnd[0].id).toBeDefined()
  })

  test('a valid blog can be added', async () => {
    const userAtStart = await helper.usersInDb()
    const userToUse = userAtStart[0].id

    const newBlog = {
      title: 'New blog',
      author: 'New Author',
      url: 'bewblog.com',
      likes: 0,
      userId: userToUse,
    }
  
    await api
      .post('/api/blogs')
      .set({ Authorization: admin_token })
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const blogAtEnd = await helper.blogInDb()
    expect(blogAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
    const title = blogAtEnd.map(blog => blog.title)
    expect(title).toContain(
      'New blog'
    )
  })

  test('creating blog without title and url will result to status 400', async () => {
    const userAtStart = await helper.usersInDb()
    const userToUse = userAtStart[0].id

    const newBlog = {
      url: 'newblog.com',
      likes: 999999,
      userId: userToUse,
    }
  
    await api
      .post('/api/blogs')
      .set({ Authorization: admin_token })
      .send(newBlog)
      .expect(400)
  })

  test('creating blog without likes property will default it to 0', async () => {
    const userAtStart = await helper.usersInDb()
    const userToUse = userAtStart[0].id

    const newBlog = {
      title: 'New Blog',
      author: 'New Author',
      url: 'newblog.com',
      userId: userToUse,
    }
  
    await api
      .post('/api/blogs')
      .set({ Authorization: admin_token })
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const blogAtEnd = await helper.blogInDb()
    const lastBlog = blogAtEnd[helper.initialBlogs.length]
    expect(lastBlog.likes).toBeDefined()
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogAtStart = await helper.blogInDb()
    const blogToDelete = blogAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set({ Authorization: admin_token })
      .expect(204)

    const blogsAtEnd = await helper.blogInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const title = blogsAtEnd.map(r => r.title)

    expect(title).not.toContain(blogToDelete.title)
  })
})

describe('updating of a blog', () => {
  test('succeeds when all input field have value', async () => {
    const blogAtStart = await helper.blogInDb()
    const blogIdToUpdate = blogAtStart[0].id
    const updateBlog = {
      title: 'update blog',
      author: 'update Author',
      url: 'updateblog.com',
      likes: 99999,
    }
  
    await api
      .put(`/api/blogs/${blogIdToUpdate}`)
      .set({ Authorization: admin_token })
      .send(updateBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const blogAtEnd = await helper.blogInDb()
    expect(blogAtEnd).toHaveLength(helper.initialBlogs.length)
  
    expect(blogAtEnd[0].title).toContain(
      'update blog'
    )
  })

  test('no title or author input will result to error', async () => {
    const blogAtStart = await helper.blogInDb()
    const blogIdToUpdate = blogAtStart[0].id
    const updateBlog = {
      title: '',
      author: '',
      url: 'updateblog.com',
      likes: 99999,
    }
  
    await api
      .put(`/api/blogs/${blogIdToUpdate}`)
      .set({ Authorization: admin_token })
      .send(updateBlog)
      .expect(400)
  })
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})