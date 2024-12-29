import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../requests"
import { useNotificationDispatch } from "./NotificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    }

  })


  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    if (content.length <= 5) {
      dispatch({ type: 'SET_NOTIFICATION', payload: `Could not add ${content} because is shorter than 5 characters` })

    } else {
      newAnecdoteMutation.mutate({ content, votes: 0 })
      dispatch({ type: 'SET_NOTIFICATION', payload: `Successfully added ${content}` })
      event.target.anecdote.value = ''
      console.log('new anecdote')
    }

  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
