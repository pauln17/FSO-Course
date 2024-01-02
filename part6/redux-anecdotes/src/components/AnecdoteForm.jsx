
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const create = async (e) => {
        e.preventDefault()
        const content = e.target.content.value
        dispatch(createAnecdote(content))
        e.target.note.value = ''
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={create}>
                <div><input name="content" /></div>
                <button>create</button>
            </form>
        </>
    )
}

export default AnecdoteForm