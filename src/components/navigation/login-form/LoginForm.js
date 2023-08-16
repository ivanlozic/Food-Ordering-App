import React, { useState } from 'react'
import styles from './LoginForm.module.css'
import { login } from '../../../redux-store/authSlice'
import { useDispatch } from 'react-redux'
import axios from 'axios'

const LoginForm = ({ onClose }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email: username,
        password
      })
      
      const { token, id } = response.data

      if (token) {
        dispatch(login({ token, id }))
        onClose()
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('Authentication failed: ' + error.response.data.message)
      } else {
        console.error('Error authenticating:', error)
      }
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type='submit'>Log In</button>
    </form>
  )
}

export default LoginForm
