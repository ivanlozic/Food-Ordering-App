import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import classes from './editProfilePage.module.css'

const EditProfilePage = () => {
  const user = useSelector((state) => state.user)
  const [formData, setFormData] = useState({
    name: user.name,
    surname: user.surname,
    email: user.email,
    password: user.password,
    phone: user.phone
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
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
