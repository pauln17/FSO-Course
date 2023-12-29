import { useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'

const BlogForm = ({ setMessage, setBlogs }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [visible, setVisible] = useState(false)

  const addBlog = async (e) => {
    e.preventDefault()
    try {
      const blog = await blogService.create({
        title,
        author,
        url,
      })

      setTitle('')
      setAuthor('')
      setUrl('')
      setVisible(false)
      setMessage({
        text: `A new blog has been added: ${blog.title} by ${blog.author}`,
        type: 'success'
      })
      blogService.getAll().then(blogs =>
        setBlogs(blogs)
      )
    } catch (exception) {
      console.log('addBlog error: ', exception)
      setMessage({
        text: 'Failed to create new blog',
        type: 'fail'
      })
    }
    setTimeout(() => {
      setMessage({ text: '', type: '' })
    }, 5000)
  }

  return (
    <>
      {!visible &&
        <button style={{ marginBottom: '10px' }} onClick={() => setVisible(true)}>
          new blog
        </button>
      }
      <div style={{ display: visible ? '' : 'none', marginBottom: '10px' }}>
        <h3>Create New Blog</h3>
        <form onSubmit={addBlog} style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex' }}>
            Title:
            <input
              type="text"
              value={title}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div style={{ display: 'flex' }}>
            Author:
            <input
              type="text"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div style={{ display: 'flex' }}>
            Url:
            <input
              type="text"
              value={url}
              name="Url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <div>
            <button type="submit">create</button>
            {visible &&
              <button onClick={() => setVisible(false)}>
                cancel
              </button>
            }
          </div>
        </form>
      </div>
    </>
  )
}

BlogForm.propTypes = {
  setMessage: PropTypes.func.isRequired,
  setBlogs: PropTypes.func.isRequired,
}

export default BlogForm