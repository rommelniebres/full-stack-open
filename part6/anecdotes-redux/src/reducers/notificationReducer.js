import { createSlice } from '@reduxjs/toolkit'

const initialState = 'You can add anecdotes!!!'
let timeId = 0

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    anecdoteNotificationHide(state, action) {
      return state = null
    },
    anecdoteNotificationShow(state, action) {
      return state = action.payload
    },
  },
})

export const { anecdoteNotificationHide, anecdoteNotificationShow } = notificationSlice.actions

export const setNotification = (message, timer) => {
  return async dispatch => {
    clearTimeout(timeId)

    timeId = setTimeout(() => {
      dispatch(anecdoteNotificationHide())
    }, timer * 1000)

    dispatch(anecdoteNotificationShow(message))
  }
}

export default notificationSlice.reducer