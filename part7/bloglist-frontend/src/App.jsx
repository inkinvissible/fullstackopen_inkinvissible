import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import Login from "./components/Login"
import Header from "./components/Header"
import Notification from "./components/Notification"
import { useDispatch, useSelector } from "react-redux"
import { initializeBlogs, setBlogs } from "./reducers/blogReducer"
import { initializeUser, logout } from "./reducers/userReducer"
import { Route, Routes } from "react-router-dom"
import Users from "./components/Users"
import User from "./components/User"
import BlogList from "./components/BlogList"
import Welcome from "./components/Welcome"
import Menu from "./components/Menu"

const App = () => {
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  if (user === null) {
    return (
      <>
        <Notification />
        <Header
          titleContent={"Log In to application"}
          pDisplay={"none"}
          navDisplay={"none"}
        />
        <Login user={user} />
      </>
    )
  }

  return (
    <div>
      {user !== null && (
        <>
          <Menu user={user} />
          <Notification />
          <Header titleContent={"Blogs"} pContent={`${user.name} logged in`} />
          
          <Routes>
            <Route path='/' element={<Welcome />} />
            <Route path='/users' element={<Users />} />
            <Route path='/users/:id' element={<User blogs={blogs} />} />
            <Route
              path='/blogs/:id'
              element={<Blog blogs={blogs} user={user} />}
            />
            <Route
              path='/blogs'
              element={<BlogList blogs={blogs} user={user} />}
            />
          </Routes>
        </>
      )}
    </div>
  )
}

export default App
