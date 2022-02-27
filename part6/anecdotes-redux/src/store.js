import { configureStore } from '@reduxjs/toolkit'
import anecdotesReducer from './reducers/anecdoteReducer'
import notificationsReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

const store = configureStore({
  reducer: {
    anecdotes: anecdotesReducer,
    notifications: notificationsReducer,
    filter: filterReducer,
  }
})

export default store