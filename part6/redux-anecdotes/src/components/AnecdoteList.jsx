import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { emptyNotification, notifyOnVote } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        if (state.filter === 'ALL') {
            return state.anecdotes
        }

        return state.anecdotes.filter(a =>
            a.content.toLowerCase().includes(state.filter.toLowerCase())
        )
    })

    const dispatch = useDispatch()

    const orderedByVotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

    const handleClick = (anecdote) => {
        dispatch(voteAnecdote(anecdote.id))
        dispatch(notifyOnVote(anecdote.content))

        setTimeout(() => {
            dispatch(emptyNotification())
        }, 5000)
    }

    return (
        <>
            {orderedByVotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleClick(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default AnecdoteList