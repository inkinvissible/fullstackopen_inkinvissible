import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Header from './components/Header'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification.jsx'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorNotification, setErrorNotification] = useState('')
  const [notification, setNotification] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const login = {
    username,
    password,
    setUsername,
    setPassword
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorNotification(`Something happened. You could not log in. Wrong user or password`)
      setTimeout(() => {
        setErrorNotification(null)
      }, 5000);
    }

  }

  const loginForm = () => {
    return (
      <>
        <Notification notificationObject={notificationObject} />
        <Header titleContent={'Log In to application'} pDisplay={'none'} />
        <Login handleLogin={handleLogin} login={login} />
      </>
    )
  }

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const notificationObject ={
    errorNotification,
    setErrorNotification,
    notification,
    setNotification
  }

  const blogsApp = () => {
    return (
      <>
        <Notification notificationObject={notificationObject} />
        <Header titleContent={'Blogs'} pContent={`${user.name} logged in`} />
        <button onClick={logout}>logout</button>

        <BlogForm blogs={blogs} setBlogs={setBlogs} notificationObject={notificationObject} />

        {
          blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
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