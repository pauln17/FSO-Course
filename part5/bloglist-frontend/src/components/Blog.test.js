import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('blog component tests', () => {
    const blog = {
        title: 'Test Title',
        author: 'Test Author',
        url: 'Test Url',
        likes: 0,
        user: {
            id: '658cf70fed4553c898383c73',
            name: 'Name',
            username: 'Username'
        }
    }

    const userData = {
        id: '658cf70fed4553c898383c73',
        name: 'Name',
        username: 'Username'
    }

    let container
    const mockHandleLikes = jest.fn()
    const mockHandleDelete = jest.fn()

    beforeEach(() => {
        const component = render(<Blog blog={blog} user={userData} handleLikes={mockHandleLikes} handleDelete={mockHandleDelete} />)
        container = component.container
    })

    test('renders only blog title by default', async () => {
        expect(container).toHaveTextContent('Test Title')
        expect(container).not.toHaveTextContent('Test Author')
        expect(container).not.toHaveTextContent('Test Url')
        expect(container).not.toHaveTextContent('Likes: 0')
    })

    test('renders blog information when show button is clicked', async () => {
        const user = userEvent.setup()
        const showButton = screen.getByText('view')
        await user.click(showButton)

        expect(container).toHaveTextContent('Test Author')
        expect(container).toHaveTextContent('Test Url')
        expect(container).toHaveTextContent('Likes: 0')
    })

    test('event handle for likes is called twice if like button is clicked twice', async () => {
        const user = userEvent.setup()
        const showButton = screen.getByText('view')
        await user.click(showButton)

        const likeButton = screen.getByText('like')
        await user.click(likeButton)
        await user.click(likeButton)


        expect(mockHandleLikes.mock.calls).toHaveLength(2)
    })

    test('event handle for deleting blogs is called', async () => {
        const user = userEvent.setup()
        const deleteButton = screen.getByText('remove')
        await user.click(deleteButton)

        expect(mockHandleDelete.mock.calls).toHaveLength(1)
    })
})