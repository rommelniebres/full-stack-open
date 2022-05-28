import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const Authors = ( props ) => {
  const [author, setAuthor] = useState('')
  const [born, setBornTo] = useState('')

  const [ editBirthYear ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ],
    onError: (error) => {
      props.setError(error.graphQLErrors[0].message)
    }
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    editBirthYear({  variables: { name: author, setBornTo: born } })

    console.log('edit author...')

    setAuthor('')
    setBornTo('')
  }

  const authors = props.authors
  
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set Birthyear</h2>
      <form onSubmit={submit}>
        {/* <div> // for inputing names rather select dropdown
          name
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div> */}
      <select value={author} onChange={({ target }) => setAuthor((target.value))}>
        <option value="">Select an author</option>
      {authors.map((a) => (
        <option key={a.name} value={a.name}>{a.name}</option>
      ))}
      </select>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBornTo(parseInt(target.value))}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
