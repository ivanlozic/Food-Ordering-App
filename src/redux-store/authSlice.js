import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  isLoggedIn: false,
  token: '',
  profilePicture: '',
  id: null,
  name: '',
  surname: '',
  email: '',
  phone: ''
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true
      state.token = action.payload.token
      state.id = action.payload.id
    },
    logout: (state) => {
      state.isLoggedIn = false
      state.token = ''
      state.profilePicture = ''
      state.id = ''
      state.name = ''
      state.surname = ''
      state.email = ''
      state.phone = ''
    },
    updateProfile: (state, action) => {
      const { name, surname, email, phone } = action.payload
      state.name = name
      state.surname = surname
      state.email = email
      state.phone = phone
    }
  }
})

export const fetchUser = (id) => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:5000/users/${id}`)
    const userData = await response.json()

    dispatch({
      type: 'user/updateProfile',
      payload: {
        name: userData.data.name,
        surname: userData.data.surname,
        email: userData.data.email,
        phone: userData.data.phone
      }
    })
  } catch (error) {
    console.log(error.message)
  }
}
export const { login, logout } = userSlice.actions
export default userSlice.reducer
