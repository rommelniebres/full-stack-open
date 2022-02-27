import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(anecdote))
  }

  return (
    <form onSubmit={addAnecdote}>
      <h2>create new</h2>
      <input name="anecdote" /> 
      <button type="submit">create</button>
    </form>
  )
}

export default AnecdoteForm