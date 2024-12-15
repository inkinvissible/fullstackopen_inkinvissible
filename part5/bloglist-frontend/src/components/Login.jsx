const Login = ({ handleLogin, login}) => {
    return (
        <form onSubmit={handleLogin}>
            <div>
                <p>Username</p>
                <input type="text" value={login.username} name="Username" onChange={({ target }) => login.setUsername(target.value)} />
            </div>
            <div>
                <p>Password</p>
                <input type="password" value={login.password} name="Password" onChange={({ target }) => login.setPassword(target.value)} />
            </div>
        <button type="submit">Login</button>
        </form>
    )
}

export default Login