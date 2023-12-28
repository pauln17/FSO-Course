import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
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

  const handleLogout = () => {
    window.location.reload()
    window.localStorage.clear()
  }

  return (
    <div>
      <h2>Blogs</h2>
      {!user ?
        <>
          <Login setUser={setUser} />
        </>
        :
        <>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          <BlogForm />
          {
            blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )
          }
        </>
      }
    </div>
  )
}

export default App