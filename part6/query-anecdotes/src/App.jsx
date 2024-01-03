import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { setNotification, useNotificationDispatch } from './context/NotificationContext'
import { getAnecdotes, updateAnecdote } from './requests'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const App = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      const updatedAnecdotes = anecdotes.map(anecdote => anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote)
      queryClient.setQueryData(['anecdotes'], updatedAnecdotes)
      setNotification(dispatch, updatedAnecdote.content, 5, 'NOTIFICATION_VOTE')
    }
  })

  const handleVote = (anecdote) => {
    const newObject = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    updateAnecdoteMutation.mutate(newObject)
  }

  const result = useQuery(
    {
      queryKey: ['anecdotes'],
      queryFn: getAnecdotes,
      retry: false
    }
  )

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <span>problem with our servers</span>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

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
