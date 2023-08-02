import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import classes from './editProfilePage.module.css'

const EditProfilePage = () => {
  const user = useSelector((state) => state.user)
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email
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
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            name='email'
            value={formData.email}
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
