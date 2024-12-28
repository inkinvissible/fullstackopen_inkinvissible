import { configureStore } from '@reduxjs/toolkit'
import filterReducer from '../reducers/filterReducer'
import anecdotesReducer from '../reducers/anecdoteReducer'
import notificationReducer from '../reducers/notificationReducer'

const store = configureStore({
    reducer: {
      anecdotes: anecdotesReducer,
      filter: filterReducer,
      notification: notificationReducer
    }
  })

export default store