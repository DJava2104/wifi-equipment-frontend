import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from '../api'
import type { RouterSchema } from '../api/Api'
import { resetUser } from './userSlice'

// Добавление роутера: черновик (название + изображение + видео) → «Далее» → публикация
interface DraftState {
  draft: RouterSchema | null
  loading: boolean
  error: string | null
}

const initialState: DraftState = {
  draft: null,
  loading: false,
  error: null,
}

export interface PublishData {
  description: string
  frequency: number
  standard: string
  max_speed: number | null
  antennas: string
}

// GET /api/router/draft — api.router.getDraft
export const getRouterDraft = createAsyncThunk<RouterSchema | null, void, { rejectValue: string }>(
  'draft/getRouterDraft',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.router.getDraft()
      return response.data ?? null
    } catch {
      return rejectWithValue('Не удалось получить черновик')
    }
  },
)

// POST /api/router (multipart) — api.router.createRouter, файлы сохраняются в MinIO
export const createRouterDraft = createAsyncThunk<
  RouterSchema,
  { title: string; image: File; video: File },
  { rejectValue: string }
>('draft/createRouterDraft', async (data, { rejectWithValue }) => {
  try {
    const response = await api.router.createRouter(data)
    return response.data
  } catch {
    return rejectWithValue('Не удалось создать черновик')
  }
})

// PUT /api/router/{id} — api.router.publishRouter: черновик → опубликован
export const publishRouterDraft = createAsyncThunk<
  RouterSchema,
  { idRouters: number; data: PublishData },
  { rejectValue: string }
>('draft/publishRouterDraft', async ({ idRouters, data }, { rejectWithValue }) => {
  try {
    const response = await api.router.publishRouter(idRouters, {
      description: data.description,
      frequency: data.frequency,
      standard: data.standard,
      max_speed: data.max_speed,
      antennas: data.antennas,
    })
    return response.data
  } catch {
    return rejectWithValue('Не удалось опубликовать роутер')
  }
})

const draftSlice = createSlice({
  name: 'draft',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRouterDraft.fulfilled, (state, action) => {
        state.loading = false
        state.draft = action.payload
      })
      .addCase(createRouterDraft.fulfilled, (state, action) => {
        state.loading = false
        state.draft = action.payload
      })
      .addCase(publishRouterDraft.fulfilled, (state) => {
        state.loading = false
        state.draft = null
      })
      .addCase(resetUser, () => initialState)
      .addMatcher(
        (action) => action.type.startsWith('draft/') && action.type.endsWith('/pending'),
        (state) => {
          state.loading = true
          state.error = null
        },
      )
      .addMatcher(
        (action) => action.type.startsWith('draft/') && action.type.endsWith('/rejected'),
        (state, action: { payload?: unknown }) => {
          state.loading = false
          state.error = typeof action.payload === 'string' ? action.payload : 'Ошибка'
        },
      )
  },
})

export default draftSlice.reducer
