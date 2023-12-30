import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

const mockAddBlogs = jest.fn(e => e.preventDefault())

describe('blog form component tests', () => {
  test('event handler for creating blogs is called when creating blogs', async () => {
    const user = userEvent.setup()

    render(<BlogForm addBlog={mockAddBlogs} />)

    const titleInput = screen.getByPlaceholderText('Title')
    const authorInput = screen.getByPlaceholderText('Author')
    const urlInput = screen.getByPlaceholderText('Url')
    await user.type(titleInput, 'Test Title')
    await user.type(authorInput, 'Test Author')
    await user.type(urlInput, 'Test Url')

    const createButton = screen.getByText('create')
    await user.click(createButton)

    expect(mockAddBlogs.mock.calls).toHaveLength(1)
  })
})