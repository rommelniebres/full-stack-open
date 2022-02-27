import { useDispatch } from 'react-redux'
import { filterAnecdotes } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    const filter = event.target.value
    dispatch(filterAnecdotes(filter))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter