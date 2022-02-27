import { createSlice } from '@reduxjs/toolkit'

const initialState = 'You can add anecdotes!!!'

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    createAnecdoteNotification(state, action) {
      return state = `You have added '${action.payload}'`
    },
    voteAnecdoteNotification(state, action) {
      return state = `You have voted '${action.payload.content}'`
    },
    anecdoteNotificationHide(state, action) {
      return state = null
    },
  },
})

export const { createAnecdoteNotification, voteAnecdoteNotification, anecdoteNotificationHide } = notificationSlice.actions
export default notificationSlice.reducer