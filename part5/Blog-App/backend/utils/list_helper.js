const _ = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) =>
    sum + blog.likes, 0
  )
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((previous, current) =>
    previous.likes >= current.likes ? previous : current
  )
}

const mostBlogs = (blogs) => {
  let countBlogs = _.countBy(blogs, 'author')
  let mostBlogAuthor = Object.keys(countBlogs).reduce((previous, current) =>
    previous >= current ? previous : current
  )

  return { author: mostBlogAuthor , blogs: countBlogs[mostBlogAuthor]}
}

const mostLikes = (blogs) => {
  let mostLikeAuthor = 
    _(blogs)
      .groupBy('author')
      .map((object, key) => ({
        'author': key,
        'likes': _.sumBy(object, 'likes') }))
      .value()
      .reduce((previous, current) =>
        previous.likes >= current.likes ? previous : current
      )

  return { author: mostLikeAuthor.author , likes: mostLikeAuthor.likes}
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}