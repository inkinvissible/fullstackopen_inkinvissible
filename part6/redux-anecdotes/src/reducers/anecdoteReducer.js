import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdoteService"


const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) { // Cambiado de addVote a voteAnecdote
      const anecdoteToChange = state.find(a => a.id === action.payload.id)
      if (anecdoteToChange) {
        anecdoteToChange.votes += 1
      }
    },
    appendAnecdote (state, action) {
      state.push(action.payload)
    },
    setAnecdote (state, action){
      return action.payload
    },
  }
})
export const {  appendAnecdote, setAnecdote, voteAnecdote} = anecdotesSlice.actions

export const initilizeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdote(anecdotes))
  }
}

export const createAnnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const addVote = content => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.updateLikes(content)
    dispatch(voteAnecdote(updatedAnecdote)) // Usar voteAnecdote en lugar de addVote
  }
}
export default anecdotesSlice.reducer