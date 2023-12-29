import { useState, useEffect } from "react"
import blogService from "../services/blogs"

const Blog = ({ blog, setBlogs, user }) => {
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

  console.log(user, 'here is user')
  console.log(blog.user.id, 'here is blog')

  useEffect(() => {
    if (user.id === blog.user.id) {
      setCorrectUser(true);
    } else {
      setCorrectUser(false);
    }
  }, [user, blog]);

  const handleLikes = async () => {
    const updatedBlogInfo = { ...blog, user: blog.user['id'], likes: blog.likes + 1 }

    try {
      const updatedBlog = await blogService.update(blog.id, updatedBlogInfo)

      setBlogs(prevBlogs =>
        prevBlogs.map(prevBlog =>
          prevBlog.id === blog.id ? updatedBlog : prevBlog
        )
      );
    } catch (error) {
      console.log('handleLikes error: ', error)
    }
  }

  const handleDelete = async () => {
    const shouldRemove = window.confirm(`Are you sure you want to delete ${blog.title} by ${blog.author}?`)
    if (!shouldRemove) return;

    try {

      await blogService.remove(blog.id)

      setBlogs(prevBlogs => prevBlogs.filter(prevBlog => prevBlog.id !== blog.id));
    } catch (error) {
      console.log('handleDelete error: ', error)
    }
  }

  return (
    <div style={blogStyle}>
      Title: {blog.title}
      {view ?
        <button style={buttonStyle} onClick={() => setView(false)}>hide</button>
        :
        <button style={buttonStyle} onClick={() => setView(true)}>view</button>
      }
      {correctUser &&
        <button style={buttonStyle} onClick={handleDelete}>remove</button>
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
              <button style={buttonStyle} onClick={handleLikes}>Like</button>
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

export default Blog