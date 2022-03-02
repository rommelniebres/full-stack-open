import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    incrementVote(state, action) {
      const contentId = action.payload.id
      const content = action.payload

      return state.map(anecdote =>
        anecdote.id !== contentId ? anecdote : content 
      ).sort((anecdoteA, anecdoteB) => anecdoteB.votes - anecdoteA.votes)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload.sort((anecdoteA, anecdoteB) => anecdoteB.votes - anecdoteA.votes)
    }
  },
})

export const { incrementVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = contentId => {
  return async dispatch => {
    const changedAnecdotes = await anecdoteService.addVoteAnecdote(contentId)
    dispatch(incrementVote(changedAnecdotes))
  }
}

export default anecdoteSlice.reducer