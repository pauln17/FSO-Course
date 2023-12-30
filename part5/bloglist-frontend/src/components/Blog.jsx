import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'

const Blog = ({ blog, handleLikes, handleDelete, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const buttonStyle = {
    marginLeft: 5
  }

  const blogInfoStyle = {
    display: 'flex',
    flexDirection: 'column',
  }

  const [view, setView] = useState(false)
  const [correctUser, setCorrectUser] = useState(false)

  useEffect(() => {
    if (user.id === blog.user.id) {
      setCorrectUser(true)
    } else {
      setCorrectUser(false)
    }
  }, [user, blog])

  return (
    <div style={blogStyle}>
      Title: {blog.title}
      {view ?
        <button style={buttonStyle} onClick={() => setView(false)}>hide</button>
        :
        <button style={buttonStyle} onClick={() => setView(true)}>view</button>
      }
      {correctUser &&
        <button style={buttonStyle} onClick={() => handleDelete(blog)}>remove</button>
      }

      {
        view &&
        (
          <div style={blogInfoStyle}>
            <div>
              Author: {blog.author}
            </div>
            <div>
              Url: {blog.url}
            </div>
            <div>
              Likes: {blog.likes}
              <button style={buttonStyle} onClick={() => handleLikes(blog)}>like</button>
            </div>
            <div>
              Creator: {blog.user.name}
            </div>
          </div>
        )
      }
    </div >
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    // Define the structure of the 'blog' object
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number,
    user: PropTypes.object.isRequired, // Assuming 'user' is an object
  }).isRequired,
  // Define the event handlers for liking a blog and deleting a blog as functions
  handleLikes: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  // Define the structure of the 'user' object
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
}

export default Blog