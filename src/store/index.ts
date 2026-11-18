import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import draftReducer from '../slices/draftSlice'
import feedReducer from '../slices/feedSlice'
import routersReducer from '../slices/routersSlice'
import userReducer from '../slices/userSlice'

// configureStore подключает redux-thunk middleware по умолчанию
export const store = configureStore({
  reducer: {
    user: userReducer,
    routers: routersReducer,
    feed: feedReducer,
    draft: draftReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
