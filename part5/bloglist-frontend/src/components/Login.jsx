import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
const Login = ({ user, setUser, notificationRef }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')



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
      notificationRef.current.setErrorNotification('Something happened. You could not log in. Wrong user or password')
      setTimeout(() => {
        notificationRef.current.setErrorNotification(null)
      }, 5000)
    }

  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        <p>Username</p>
        <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        <p>Password</p>
        <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button type="submit">Login</button>
    </form>
  )
}

export default Login