import axios from 'axios'

export const getAnecdotes = () => {
    return axios.get('http://localhost:3001/anecdotes').then(res => res.data)
}

export const createAnecdote = (newObject) => {
    return axios.post('http://localhost:3001/anecdotes', newObject).then(res => res.data)
}

export const updateAnecdote = (newObject) => {
    return axios.put(`http://localhost:3001/anecdotes/${newObject.id}`, newObject).then(res => res.data)
}