import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    addNotification(state, action) {
      return action.payload
    },
    clearNotification(state) {
      return null
    }
  },
})

export const { addNotification, clearNotification } = notificationSlice.actions

export const setNotification = (text, time) => {
  return async (dispatch) => {
    dispatch(addNotification(text))
    setTimeout(() => {
      dispatch(clearNotification())
    }, time)
  }
}

export default notificationSlice.reducer