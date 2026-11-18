import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

// Состояние интерфейса после авторизации. Заполняется вручную (dispatch) из
// обработчиков axios-запросов /api/login и /api/logout — без thunk и кодогенерации.
interface UserState {
  id_user: number | null
  username: string
  isAuthenticated: boolean
}

const initialState: UserState = {
  id_user: null,
  username: '',
  isAuthenticated: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ id_user: number; username: string }>) {
      state.id_user = action.payload.id_user
      state.username = action.payload.username
      state.isAuthenticated = true
    },
    resetUser() {
      return initialState
    },
  },
})

export const { setUser, resetUser } = userSlice.actions
export default userSlice.reducer
