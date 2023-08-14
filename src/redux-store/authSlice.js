import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  isLoggedIn: false,
  token: '',
  profilePicture: ''
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true
      state.token = action.payload.token
    },
    logout: (state) => {
      state.isLoggedIn = false
      state.token = ''
    }
  }
})

export const { login, logout } = userSlice.actions
export default userSlice.reducer
