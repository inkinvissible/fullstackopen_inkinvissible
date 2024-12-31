import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { login } from '../reducers/userReducer'

const Login = ({ user, setUser, notificationRef }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      // const user = await loginService.login({ username, password })
      // window.localStorage.setItem('loggedUser', JSON.stringify(user))
      // blogService.setToken(user.token)
      // setUser(user)
      dispatch(login(username, password))
      dispatch(setNotification(`You have logged in as ${username}`, 5000))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification(`You could not log in as ${username}`, 5000))
    }

  }

  return (
    <form onSubmit={handleLogin}>
      <div data-testid='usernameElement'>
        <p>Username</p>
        <input data-testid='username' type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div data-testid='passwordElement'>
        <p>Password</p>
        <input data-testid='password' type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button type="submit">Login</button>
    </form>
  )
}

export default Login