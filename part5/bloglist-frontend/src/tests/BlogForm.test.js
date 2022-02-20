import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from '../components/BlogForm'
import userEvent from '@testing-library/user-event'

test('<NoteForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  render(<BlogForm createBlog={createBlog} />)

  const input = screen.getByPlaceholderText('write title here')
  const sendButton = screen.getByText('create')

  userEvent.type(input, 'testing a form...' )
  userEvent.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing a form...' )
})