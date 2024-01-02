import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    voteAnecdote(state, action) {
      const anecdoteId = action.payload
      console.log(anecdoteId, 'here is id')
      const anecdoteToChange = state.find(anecdote => anecdote.id === anecdoteId)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }

      return state.map(anecdote => anecdote.id === anecdoteId ? changedAnecdote : anecdote)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  }
})

export const { voteAnecdote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.create(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const updateVoteAnecdote = (id, newObject) => {
  return async dispatch => {
    const updatedAnecdote = await anecdotesService.update(id, newObject)
    dispatch(voteAnecdote(id))
  }
}

export default anecdoteSlice.reducer