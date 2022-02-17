import { useState } from 'react'

const Blog = ({ blog, likeBlog, deleteBlog, user }) => {
  const [view, setView] = useState(false)
  const hideWhenView = { display: view ? 'none' : '' }
  const showWhenView = { display: view ? '' : 'none' }
  const showDelete = user.username === blog.user.username ? '' : 'none'

  const toggleView = () => {
    setView(!view)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const deleteBtnStyle = {
    backgroundColor: '#f44336',
    color: 'white',
    display: showDelete
  }

  const removeBlog = (event) => {
    event.preventDefault()

    deleteBlog({
      user: blog.user,
      id: blog.id,
      title: blog.title,
      author: blog.author,
    })
  }

  const incrementLike = (event) => {
    event.preventDefault()

    likeBlog({
      user: blog.user.id,
      id: blog.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    })
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenView}>
        <span> {blog.title} </span>
        <button onClick={toggleView}>view</button>
      </div>
      <div style={showWhenView}>
        <span> {blog.title} </span>
        <button onClick={toggleView}>hide</button>
        <p> {blog.url} </p>
        <p> <span> {blog.likes} Likes</span> <button onClick={incrementLike}>like</button> </p>
        <p> {blog.author} </p>
        <button style={deleteBtnStyle} onClick={removeBlog}>delete</button>
      </div>
    </div>
  )
}

export default Blog