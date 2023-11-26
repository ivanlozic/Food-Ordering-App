import { createSlice } from '@reduxjs/toolkit'
const storedToken = localStorage.getItem('authToken')
const storedUserData = localStorage.getItem('userData')

const initialState = {
  isLoggedIn: !!storedToken,
  token: storedToken || '',
  profilePicture: '',
  id: null,
  name: '',
  surname: '',
  email: '',
  password: '',
  phone: '',
  streetAddress: '',
  city: '',
  country: ''
}

if (storedUserData) {
  const userData = JSON.parse(storedUserData)
  initialState.id = userData.id
  initialState.name = userData.name
  initialState.surname = userData.surname
  initialState.email = userData.email
  initialState.password = userData.password
  initialState.phone = userData.phoneNumber
  initialState.streetAddress = userData.streetAddress
  initialState.city = userData.city
  initialState.country = userData.country
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      const { token, user } = action.payload;
      state.isLoggedIn = true;
      state.token = token;
      Object.assign(state, user);
      localStorage.setItem('authToken', token);
      localStorage.setItem('userData', JSON.stringify(user));
    },
    logout: (state) => {
      state.isLoggedIn = false
      state.token = ''
      state.profilePicture = ''
      state.id = ''
      state.name = ''
      state.surname = ''
      state.email = ''
      state.password = ''
      state.phone = ''
      state.streetAddress = ''
      state.city = ''
      state.country = ''

      localStorage.removeItem('authToken')
      localStorage.removeItem('userData')
    },
    updateProfile: (state, action) => {
      Object.assign(state, action.payload);
    },
  }
})

export const { login, logout } = userSlice.actions
export default userSlice.reducer
