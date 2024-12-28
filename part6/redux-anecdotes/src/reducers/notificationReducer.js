import { createSlice } from "@reduxjs/toolkit";

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        addNotification(state, action) {
            return action.payload
        }
    }
})

export const { addNotification } = notificationSlice.actions

export const setNotification = (text, time) => {
    return async dispatch => {
        dispatch(addNotification(text))
        setTimeout(() => {
            dispatch(addNotification(''))
        }, time)
    }
}

export default notificationSlice.reducer  