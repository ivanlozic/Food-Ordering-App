import React, { useState } from 'react'
import classes from './LoginForm.module.css'
import { login } from '../../../../redux-store/reducers/authReducer'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import Spinner from '../../../spinner/Spinner'

const LoginForm = ({ onClose }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    try {
      const response = await axios.post(
        'https://fluffy-jay-peplum.cyclic.cloud/api/login',

        {
          email: username,
          password
        }
      )

      const { token, user } = response.data
      console.log(response.data)

      if (token) {
        dispatch(login({ token, user }))
        onClose()
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('Authentication failed: ' + error.response.data.message)
      } else {
        console.error('Error authenticating:', error)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <form className={classes.form} onSubmit={handleSubmit}>
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
      )}
    </div>
  )
}

export default LoginForm
