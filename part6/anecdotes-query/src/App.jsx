import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { addVote, getAnecdotes } from './requests'
import { useNotificationDispatch } from './components/NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()
  const updateAnecdoteMutation = useMutation({ 
    mutationFn: addVote, 
    onSuccess: (updatedAnecdote) =>{
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      const updatedAnecdotes = anecdotes.map(a => a.id === updatedAnecdote.id ? updatedAnecdote : a)
      queryClient.setQueryData(['anecdotes'], updatedAnecdotes)
    }
  
  })
  const handleVote = (anecdote) => {
    anecdote.votes++
    updateAnecdoteMutation.mutate(anecdote)
    notificationDispatch({ type: 'SET_NOTIFICATION', payload: `You voted for '${anecdote.content}'` })
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false
  })

  if (result.isLoading) {
    return <div>Loading...</div>
  }

  if (result.isError){
    return <div>Anecdote Service not available</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      
      <Notification />
      <AnecdoteForm type='SET_NOTIFICATION' />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
