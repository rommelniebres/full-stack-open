import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const update = async (content) => {
  const url = `${baseUrl}/${content.id}`
  const response = await axios.put(url, content)
  return response.data
}

const addVoteAnecdote = async (contentId) => {
  const allAnecdotes = await getAll()
  const anecdoteToChange = allAnecdotes.find(n => n.id === contentId)
  const changedAnecdote = { 
    ...anecdoteToChange, 
    votes: anecdoteToChange.votes + 1
  }
  const response = await update(changedAnecdote)
  return response
}

export default { getAll, createNew, addVoteAnecdote }