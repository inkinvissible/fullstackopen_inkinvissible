import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Header from './components/Header'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const notificationRef = useRef()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])


  const loginForm = () => {
    return (
      <>
        <Notification ref={notificationRef} />
        <Header titleContent={'Log In to application'} pDisplay={'none'} />
        <Login user={user} setUser={setUser} notificationRef={notificationRef} />
      </>
    )
  }

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    blogService.setToken(null)
  }

  const updateBlog = (updatedBlog, action) => {
    if (action==='updateLikes') {
      setBlogs(blogs.map(blog => blog.id !== updatedBlog.id ? blog : updatedBlog))
    }else if( action === 'delete'){
      setBlogs(blogs.filter(blog => blog.id !== updatedBlog))
    }
  }
  const blogsApp = () => {
    return (
      <>
        <Notification ref={notificationRef} />
        <Header titleContent={'Blogs'} pContent={`${user.name} logged in`} />
        <button onClick={logout}>logout</button>

        <Togglable buttonLabel={'New Blog'}>
          <BlogForm blogs={blogs} setBlogs={setBlogs} notificationRef={notificationRef} />
        </Togglable>

        {
          blogs.sort((a, b) => b.likes - a.likes).map(blog =>
            <Blog key={blog.id} blog={blog} updateBlog={updateBlog} notificationRef={notificationRef} user={user} />
          )
        }
      </>
    )
  }

  return (
    <div>
      {user === null ? loginForm() : blogsApp()}

    </div>
  )
}

export default App