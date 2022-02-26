import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })
  }

  return (
    <form onSubmit={addBlog}>
      <p>Title:<input id='title' value={newTitle} onChange={handleTitleChange} placeholder='write title here'/></p>
      <p>Author:<input id='author' value={newAuthor} onChange={handleAuthorChange}/></p>
      <p>URL:<input id='url' value={newUrl} onChange={handleUrlChange}/></p>
      <button id='create-blog-btn' type="submit">create</button>
    </form>
  )
}

export default BlogForm