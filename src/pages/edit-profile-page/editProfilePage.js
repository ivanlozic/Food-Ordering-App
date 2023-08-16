import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classes from './editProfilePage.module.css'
import { fetchUser } from '../../redux-store/authSlice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const EditProfilePage = () => {
  const user = useSelector((state) => state.user)
  const [changePassword, setChangePassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    phone: '',
    newPassword: '',
    confirmPassword: ''
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (user.id) {
      dispatch(fetchUser(user.id))
    }
  }, [dispatch, user])

  useEffect(() => {
    setFormData({
      name: user.name || '',
      surname: user.surname || '',
      email: user.email || '',
      password: '',
      phone: user.phone || '',
      newPassword: '',
      confirmPassword: ''
    })
  }, [user])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const updatedProfileData = {
      name: formData.name,
      surname: formData.surname,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      ...(changePassword && {
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword
      })
    }

    try {
      const response = await axios.put(
        'http://localhost:5000/users',
        updatedProfileData
      )

      if (response.status === 200) {
        if (
          window.confirm(
            'Profile updated successfully. Click OK to return to the home page.'
          )
        ) {
          navigate('/')
        }
      } else {
        console.error('Error updating profile:', response.data.message)
      }
    } catch (error) {
      console.error('Axios error:', error)
    }
  }

  return (
    <div className={classes.container}>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className={classes['form-group']}>
          <label htmlFor='name'>Name:</label>
          <input
            type='text'
            id='name'
            name='name'
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className={classes['form-group']}>
          <label htmlFor='surname'>Surname:</label>
          <input
            type='text'
            id='surname'
            name='surname'
            value={formData.surname}
            onChange={handleChange}
          />
        </div>
        <div className={classes['form-group']}>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className={classes['form-group']}>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className={classes['form-group']}>
          <label className={classes.checkboxLabel}>
            <input
              type='checkbox'
              checked={changePassword}
              onChange={(e) => setChangePassword(e.target.checked)}
            />
            <span>Change Password</span>
          </label>
        </div>
        {changePassword && (
          <div>
            <div className={classes['form-group']}>
              <label htmlFor='newPassword'>New Password:</label>
              <input
                type='password'
                id='newPassword'
                name='newPassword'
                value={formData.newPassword}
                onChange={handleChange}
              />
            </div>
            <div className={classes['form-group']}>
              <label htmlFor='confirmPassword'>Confirm New Password:</label>
              <input
                type='password'
                id='confirmPassword'
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>
        )}
        <div className={classes['form-group']}>
          <label htmlFor='phone'>Phone:</label>
          <input
            type='text'
            id='phone'
            name='phone'
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div>
          <button type='submit'>Save Changes</button>
        </div>
      </form>
    </div>
  )
}

export default EditProfilePage
