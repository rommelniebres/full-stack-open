import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  // const [loginVisible, setLoginVisible] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)

      blogService.getAll().then(blogs =>
        setBlogs( blogs.sort((blogA, blogB) => blogB.likes - blogA.likes) )
      )
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

      const blogs = await blogService.getAll()
      setBlogs(blogs.sort((blogA, blogB) => blogB.likes - blogA.likes))

      setErrorMessage(`Welcome ${user.name}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

    } catch (exception) {
      setErrorMessage('Error: Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setUsername('')
    setPassword('')
  }

  const createBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.createBlog(blogObject)
      setBlogs(blogs.concat(returnedBlog))

      blogFormRef.current.toggleVisibility()

      setErrorMessage(
        `a new blog '${blogObject.title}' by ${blogObject.author} added`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

    } catch (exception) {
      setErrorMessage('Error on creating blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const likeBlog = async (blogObject) => {
    try {
      const returnedUpdatedBlog = await blogService.updateBlog(blogObject)

      setBlogs(blogs.map(blog => blog.id !== returnedUpdatedBlog.id ? blog : returnedUpdatedBlog).sort((blogA, blogB) => blogB.likes - blogA.likes))

      setErrorMessage(
        `the blog '${blogObject.title}' by ${blogObject.author} was updated`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

    } catch (exception) {
      setErrorMessage('Error on liking the blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async (blogObject) => {
    if (window.confirm(`Delete ${blogObject.title} by ${blogObject.author}?`)) {
      try {
        await blogService.deleteBlog(blogObject)

        const blogToDelete = blogs.map(blog => blog.id).indexOf(blogObject.id)
        blogs.splice(blogToDelete, 1)

        setBlogs(blogs.sort((blogA, blogB) => blogB.likes - blogA.likes))

        setErrorMessage(
          `the blog '${blogObject.title}' by ${blogObject.author} was deleted`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)

      } catch (exception) {
        setErrorMessage('Error on deleting the blog')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }
  }

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={createBlog} />
    </Togglable>
  )

  if (user === null) {
    return (
      <div>
        <Notification message={errorMessage} />
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <Notification message={errorMessage} />

      <div>
        Logged in as {user.name}
        <button onClick={handleLogout}> logout </button>
      </div>

      <div>
        <p>Create new blog</p>
        {blogForm()}
      </div>

      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog} user={user}/>
      ).sort((blogA, blogB) => blogB.likes - blogA.likes)}
    </div>
  )
}

export default App