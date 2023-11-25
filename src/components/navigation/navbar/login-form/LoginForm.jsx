import React, { useState } from 'react'
import classes from './LoginForm.module.css'
import { login } from '../../../../redux-store/reducers/authReducer'
import { useDispatch } from 'react-redux'
import Spinner from '../../../spinner/Spinner'
import { axiosInstance } from '../../../../config/axios'
import { axiosRoutes } from '../../../../constants/constants'
import ErrorPrompt from '../../../error-prompt/ErrorPrompt'

const LoginForm = ({ onClose }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    try {
      const response = await axiosInstance.post(
        axiosRoutes.users.login,

        {
          email: username,
          password
        }
      )

      const { token, user } = response.data

      if (token) {
        dispatch(login({ token, user }))
        onClose()
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Authentication failed: ' + error.response.data.message);
      } else {
        console.error('Error authenticating:', error)
      }
    } finally {
      setLoading(false)
    }
  }
  const handleCloseError = () => {
    setError(null)
  }

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <>
         {error && <ErrorPrompt errorMessage={error} onClose={handleCloseError} />}
          <form className={classes.form} onSubmit={handleSubmit}>
            <input
              type='text'
              placeholder='Email'
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
        </>
      )}
    </div>
  )
}

export default LoginForm
