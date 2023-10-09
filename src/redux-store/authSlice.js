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
      state.isLoggedIn = true
      state.token = action.payload.token
      state.id = action.payload.user.id
      state.name = action.payload.user.name
      state.surname = action.payload.user.surname
      state.email = action.payload.user.email
      state.phone = action.payload.user.phoneNumber
      state.streetAddress = action.payload.user.streetAddress
      state.city = action.payload.user.city
      state.country = action.payload.user.country
      localStorage.setItem('authToken', action.payload.token)
      localStorage.setItem('userData', JSON.stringify(action.payload.user))
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
      state.streetAddress = ''
      state.city = ''
      state.country = ''
    },
    updateProfile: (state, action) => {
      const { name, surname, email, phone, streetAddress, city, country } =
        action.payload
      state.name = name
      state.surname = surname
      state.email = email
      state.phone = phone
      state.streetAddress = streetAddress
      state.city = city
      state.country = country
    }
  }
})

export const fetchUser = (id) => async (dispatch) => {
  try {
    const response = await fetch(
      `https://fluffy-jay-peplum.cyclic.cloud/users/${id}`
    )
    const userData = await response.json()
    console.log(response.data)
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