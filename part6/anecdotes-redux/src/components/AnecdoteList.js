import { useDispatch, useSelector } from 'react-redux'
import { incrementVote } from '../reducers/anecdoteReducer'
import { voteAnecdoteNotification, anecdoteNotificationHide } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return(
    <li>
      {anecdote.content} has {anecdote.votes}
      <div>
        <button onClick={handleClick}>vote</button>
      </div>
    </li>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if ( filter === '' ) {
      return anecdotes
    }

    return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  })
  const dispatch = useDispatch()

  return(
    <ul>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => 
            {
              dispatch(incrementVote(anecdote.id))
              dispatch(voteAnecdoteNotification(anecdote))
              setTimeout(() => {
                dispatch(anecdoteNotificationHide())
              }, 5000)
            }
          }
        />
      )}
    </ul>
  )
}

export default AnecdoteList