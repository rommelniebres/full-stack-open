// In new applications you should absolutely use the hook-api, but knowing how to use connect is useful when maintaining older projects using redux.
// using connect
import { connect } from 'react-redux'
import { filterAnecdotes } from '../reducers/filterReducer'

const Filter = (props) => {
  const handleChange = (event) => {
    const filter = event.target.value
    props.filterAnecdotes(filter)
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

export default connect(
  null, 
  { filterAnecdotes }
)(Filter)

// using hook-apo
// import { useDispatch } from 'react-redux'
// import { filterAnecdotes } from '../reducers/filterReducer'

// const Filter = () => {
//   const dispatch = useDispatch()

//   const handleChange = (event) => {
//     const filter = event.target.value
//     dispatch(filterAnecdotes(filter))
//   }
//   const style = {
//     marginBottom: 10
//   }

//   return (
//     <div style={style}>
//       filter <input onChange={handleChange} />
//     </div>
//   )
// }

// export default Filter