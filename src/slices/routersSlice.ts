import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { api } from '../api'
import { FREQ_MAX, FREQ_MIN, getRoutersMock, type Router } from '../modules/routersApi'
import type { RootState } from '../store'
import { resetUser } from './userSlice'

// Плитка роутеров + фильтр по частоте (хранится в Redux, сбрасывается при выходе)
interface RoutersState {
  freqMin: number
  freqMax: number
  routers: Router[]
  loading: boolean
  isMock: boolean
  error: string | null
}

const initialState: RoutersState = {
  freqMin: FREQ_MIN,
  freqMax: FREQ_MAX,
  routers: [],
  loading: false,
  isMock: false,
  error: null,
}

// GET /api/routers?freq_min=&freq_max= — сгенерированный метод api.routers.getRouters
export const getRoutersList = createAsyncThunk<
  { routers: Router[]; isMock: boolean },
  void,
  { state: RootState; rejectValue: string }
>('routers/getRoutersList', async (_, { getState, rejectWithValue }) => {
  const { routers, user } = getState()
  const freqMin = Math.min(routers.freqMin, routers.freqMax)
  const freqMax = Math.max(routers.freqMin, routers.freqMax)
  try {
    const response = await api.routers.getRouters({ freq_min: freqMin, freq_max: freqMax })
    return { routers: response.data, isMock: false }
  } catch {
    // mock-коллекция — только для гостя при недоступном веб-сервисе
    if (!user.isAuthenticated) return { routers: getRoutersMock(freqMin, freqMax), isMock: true }
    return rejectWithValue('Веб-сервис недоступен')
  }
})

// DELETE /api/router/{id} — api.router.deleteRouter (только свои, is_creator = 1)
export const deleteRouterItem = createAsyncThunk<number, number, { rejectValue: string }>(
  'routers/deleteRouterItem',
  async (idRouters, { rejectWithValue }) => {
    try {
      await api.router.deleteRouter(idRouters)
      return idRouters
    } catch {
      return rejectWithValue('Не удалось удалить роутер')
    }
  },
)

const routersSlice = createSlice({
  name: 'routers',
  initialState,
  reducers: {
    setFreqMin(state, action: PayloadAction<number>) {
      state.freqMin = action.payload
    },
    setFreqMax(state, action: PayloadAction<number>) {
      state.freqMax = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRoutersList.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getRoutersList.fulfilled, (state, action) => {
        state.loading = false
        state.routers = action.payload.routers
        state.isMock = action.payload.isMock
      })
      .addCase(getRoutersList.rejected, (state, action) => {
        state.loading = false
        state.routers = []
        state.error = action.payload ?? 'Ошибка загрузки'
      })
      .addCase(deleteRouterItem.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteRouterItem.fulfilled, (state, action) => {
        state.loading = false
        state.routers = state.routers.filter((item) => item.id_routers !== action.payload)
      })
      .addCase(deleteRouterItem.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ?? 'Ошибка удаления'
      })
      // при выходе сбрасывается фильтр пользователя
      .addCase(resetUser, (state) => {
        state.freqMin = FREQ_MIN
        state.freqMax = FREQ_MAX
      })
  },
})

export const { setFreqMin, setFreqMax } = routersSlice.actions
export default routersSlice.reducer
