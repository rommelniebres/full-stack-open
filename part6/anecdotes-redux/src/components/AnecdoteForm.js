// In new applications you should absolutely use the hook-api, but knowing how to use connect is useful when maintaining older projects using redux.
// using connect
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''

    props.createAnecdote(anecdote)
    props.setNotification(`You have added '${anecdote}'`, 5)
  }

  return (
    <form onSubmit={addAnecdote}>
      <h2>create new</h2>
      <input name="anecdote" /> 
      <button type="submit">create</button>
    </form>
  )
}

export default connect(
  null, 
  { createAnecdote, setNotification }
)(AnecdoteForm)

// using hook-apo
// import { useDispatch } from 'react-redux'
// import { createAnecdote } from '../reducers/anecdoteReducer'
// import { setNotification } from '../reducers/notificationReducer'

// const AnecdoteForm = (props) => {
//   const dispatch = useDispatch()

//   const addAnecdote = async (event) => {
//     event.preventDefault()
//     const anecdote = event.target.anecdote.value
//     event.target.anecdote.value = ''

//     dispatch(createAnecdote(anecdote))
//     dispatch(setNotification(`You have added '${anecdote}'`, 5))
//   }

//   return (
//     <form onSubmit={addAnecdote}>
//       <h2>create new</h2>
//       <input name="anecdote" /> 
//       <button type="submit">create</button>
//     </form>
//   )
// }

// export default AnecdoteForm