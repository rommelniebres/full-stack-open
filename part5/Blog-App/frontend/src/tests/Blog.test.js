import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'

const blog = {
  user: '618d1af645db19adfc13a435',
  id: '62121acbfb9ba48cea4c1c1e',
  likes: 0,
  author: 'rommel',
  title: 'The amazing blog',
  url: 'https://myamazingblogapp.herokuapp.com',
}

const user = {
  username: 'rommel',
  password: 'codingisfun'
}

test('renders content', () => {
  render(<Blog blog={blog} user = {user} />)

  const element = screen.getByText('The amazing blog')
  // screen.debug(element)
  expect(element).toBeDefined() // test
})

test('clicking the button calls event handler once', async () => {
  const mockHandler = jest.fn()

  render(
    <Blog blog={blog} user = {user} likeBlog={mockHandler} />
  )

  const button = screen.getByText('view')
  userEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(0) // test
})


test('renders title and author by default', () => {
  const { container } = render(<Blog blog={blog} user = {user} />)
  const div = container.querySelector('.defaultView')

  expect(div).toHaveTextContent(
    'The amazing blog by rommel'
  )
})

test('show the url and like when view button is clicked', () => {
  const { container } = render(<Blog blog={blog} user = {user} />)
  const div = container.querySelector('.expandedView')
  const viewButton = screen.getByText('view')

  expect(div).toHaveStyle('display: none')

  userEvent.click(viewButton)

  expect(div).toHaveStyle('display: block')
  expect(div).toHaveTextContent(
    'https://myamazingblogapp.herokuapp.com'
  )
  expect(div).toHaveTextContent(
    'Likes'
  )
})

test('when like button is clicked twice', () => {
  const mockHandler = jest.fn()

  render(<Blog blog={blog} user = {user} likeBlog={mockHandler} />)
  const likeButton = screen.getByText('like')

  userEvent.click(likeButton)
  userEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2) // test
})