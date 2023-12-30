import { useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'

const BlogForm = ({
  addBlog,
  visible,
  setVisible,
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
}) => {

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
              placeholder="Title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div style={{ display: 'flex' }}>
            Author:
            <input
              type="text"
              value={author}
              name="Author"
              placeholder="Author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div style={{ display: 'flex' }}>
            Url:
            <input
              type="text"
              value={url}
              name="Url"
              placeholder="Url"
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
  addBlog: PropTypes.func.isRequired,
}

export default BlogForm