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
          <BlogForm setMessage={setMessage} setBlogs={setBlogs} />
          {
            sortedBlogs.map(blog =>
              <Blog key={blog.id} user={user} blog={blog} setBlogs={setBlogs} />
            )
          }
        </>
      }
    </div>
  )
}

export default App