import { createSlice } from '@reduxjs/toolkit'

const initialState = 'You can add anecdotes!!!'

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
    dispatch(anecdoteNotificationShow(message))

    setTimeout(() => {
      dispatch(anecdoteNotificationHide())
    }, timer * 1000)
  }
}

export default notificationSlice.reducer