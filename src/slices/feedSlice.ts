import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from '../api'
import { getRouterFeedMock, type Router } from '../modules/routersApi'
import type { RootState } from '../store'

// Лента: текущая карточка роутера и лайки
interface FeedState {
  router: Router | null
  loading: boolean
  error: string | null
}

const initialState: FeedState = {
  router: null,
  loading: false,
  error: null,
}

// GET /api/router?id_routers=&next= — api.router.getRouter
export const getRouterFeed = createAsyncThunk<
  Router,
  { id?: number | string; next?: boolean },
  { state: RootState; rejectValue: string }
>('feed/getRouterFeed', async ({ id, next = false }, { getState, rejectWithValue }) => {
  try {
    const response = await api.router.getRouter({
      id_routers: id !== undefined && id !== '' ? Number(id) : undefined,
      next,
    })
    return response.data
  } catch {
    // mock-коллекция — только для гостя при недоступном веб-сервисе
    if (!getState().user.isAuthenticated) return getRouterFeedMock(id, next)
    return rejectWithValue('Роутер не найден')
  }
})

// POST /api/router/{id} like=0|1 — api.router.likeRouter
export const likeRouterItem = createAsyncThunk<
  { like_count: number; is_liked: number },
  { idRouters: number; like: number },
  { rejectValue: string }
>('feed/likeRouterItem', async ({ idRouters, like }, { rejectWithValue }) => {
  try {
    const response = await api.router.likeRouter(idRouters, { like })
    return { like_count: response.data.like_count, is_liked: like }
  } catch {
    return rejectWithValue('Не удалось поставить лайк')
  }
})

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRouterFeed.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getRouterFeed.fulfilled, (state, action) => {
        state.loading = false
        state.router = action.payload
      })
      .addCase(getRouterFeed.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ?? 'Ошибка загрузки'
      })
      .addCase(likeRouterItem.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(likeRouterItem.fulfilled, (state, action) => {
        state.loading = false
        if (state.router) {
          state.router.like_count = action.payload.like_count
          state.router.is_liked = action.payload.is_liked
        }
      })
      .addCase(likeRouterItem.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ?? 'Ошибка'
      })
  },
})

export default feedSlice.reducer
