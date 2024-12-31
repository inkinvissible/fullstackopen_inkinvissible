import { createSlice } from "@reduxjs/toolkit"
import loginService from "../services/login"
import blogService from "../services/blogs"

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    clearUser(state, action) {
      return null
    },
  },
})

export const { setUser, clearUser } = userSlice.actions

export const login = (username, password) => {
  return async (dispatch) => {
    const response = await loginService.login({ username, password })
    window.localStorage.setItem("loggedUser", JSON.stringify(response))
    blogService.setToken(response.token)
    dispatch(setUser(response))
  }
}

export const initializeUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(setUser(user))
    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem("loggedUser")
    dispatch(setUser(null))
    blogService.setToken(null)
  }
}

export default userSlice.reducer
