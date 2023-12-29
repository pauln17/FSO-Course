import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import userService from './services/users'
import Login from './components/Login'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [users, setUsers] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({
    text: '',
    type: ''
  })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )


    userService.getAll().then(users =>
      setUsers(users)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('LoggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
  const handleLogout = () => {
    window.location.reload()
    window.localStorage.clear()
  }

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

  const handleLikes = async () => {
    const updatedBlogInfo = { ...blog, user: blog.user['id'], likes: blog.likes + 1 }

    try {
      const updatedBlog = await blogService.update(blog.id, updatedBlogInfo)

      setBlogs(prevBlogs =>
        prevBlogs.map(prevBlog =>
          prevBlog.id === blog.id ? updatedBlog : prevBlog
        )
      )
    } catch (error) {
      console.log('handleLikes error: ', error)
    }
  }

  const handleDelete = async () => {
    const shouldRemove = window.confirm(`Are you sure you want to delete ${blog.title} by ${blog.author}?`)
    if (!shouldRemove) return

    try {

      await blogService.remove(blog.id)

      setBlogs(prevBlogs => prevBlogs.filter(prevBlog => prevBlog.id !== blog.id))
    } catch (error) {
      console.log('handleDelete error: ', error)
    }
  }

  return (
    <div>
      <h2>Blogs</h2>
      {message &&
        <div style={{ color: message.type === 'fail' ? 'red' : 'green' }}>{message.text}</div>}
      {!user ?
        <>
          <Login setUser={setUser} setMessage={setMessage} />
        </>
        :
        <>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          <BlogForm setMessage={setMessage} addBlog={addBlog} />
          {
            sortedBlogs.map(blog =>
              <Blog key={blog.id} user={user} blog={blog} handleLikes={handleLikes} handleDelete={handleDelete} />
            )
          }
        </>
      }
    </div>
  )
}

export default App