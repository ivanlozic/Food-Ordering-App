import React, { useState } from 'react'
import styles from './CreateAccountPage.module.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

const CreateAccountPage = () => {
  const [passwordMatchError, setPasswordMatchError] = useState('')
  const [errors, setErrors] = useState({})

  const [values, setValues] = useState({
    name: '',
    surame: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    streetAddress: '',
    city: '',
    country: ''
  })

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (Object.keys(errors).length > 0) {
      return
    }

    if (values.password !== values.confirmPassword) {
      setPasswordMatchError('Passwords do not match')
      return
    }

    const userData = values
    try {
      const response = await axios.post(
        'https://fluffy-jay-peplum.cyclic.cloud/users',
        userData
      )
      console.log('User registered successfully:', response.data)

      if (response.status === 200) {
        alert('User registered successfully')
        navigate('/')
      }
    } catch (error) {
      alert(error.response.data.message)
      console.log(error)
    }
  }
  const validateConfirmPassword = (confirmPassword, password) => {
    const errors = {}
    if (!confirmPassword || confirmPassword.trim() === '') {
      setPasswordMatchError('Confirm Password is required')
    } else if (confirmPassword !== password) {
      setPasswordMatchError('Passwords do not match')
    }

    return errors
  }

  const validate = (values) => {
    let errors = {}

    const confirmPasswordErrors = validateConfirmPassword(
      values.confirmPassword,
      values.password
    )
    if (Object.keys(confirmPasswordErrors).length > 0) {
      errors = { ...errors, ...confirmPasswordErrors }
    }

    if (!values || !values.name || values.name.trim() === '') {
      errors.name = 'First Name is required'
    } else if (values.name[0].toUpperCase() !== values.name[0]) {
      errors.name = 'First name should start with an uppercase letter'
    }
    if (!values || !values.surname || values.surname.trim() === '') {
      errors.surname = 'Last Name is required'
    } else if (values.surname[0].toUpperCase() !== values.surname[0]) {
      errors.surname = 'Last name should start with an uppercase letter'
    }
    if (
      !values ||
      !values.streetAddress ||
      values.streetAddress.trim() === ''
    ) {
      errors.streetAddress = 'Address is required'
    }
    if (!values || !values.email || values.email.trim() === '') {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Invalid email address'
    }

    if (!values || !values.password || values.password.trim() === '') {
      errors.password = 'Password is required'
    } else if (values.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long'
    }

    if (!values || !values.phoneNumber) {
      errors.phoneNumber = 'Mobile Phone is required'
    } else if (
      !/^[0-9]+$/.test(values.phoneNumber) ||
      values.phoneNumber.length < 11
    ) {
      errors.phoneNumber = 'Mobile Phone must have at least 11-digits'
    }

    if (!values || !values.city || values.city.trim() === '') {
      errors.city = 'City is required'
    }

    if (!values || !values.country || values.country.trim() === '') {
      errors.country = 'County is required'
    }
    return errors
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }))
    const validationErrors = validate({ ...values, [name]: value })
    setErrors(validationErrors)
  }

  return (
    <div className={styles.container}>
      <h1>Create Account</h1>
      <Link to='/' className={styles.backButton}>
        Back to Home Page
      </Link>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor='name'>Name:</label>
          <input
            type='text'
            id='name'
            name='name'
            value={values.name}
            onChange={handleChange}
            className={styles.input}
          />
          {errors.name && <p className={styles.errorMessage}>{errors.name}</p>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor='surname'>Surname:</label>
          <input
            type='text'
            id='surname'
            name='surname'
            value={values.surname}
            onChange={handleChange}
            className={styles.input}
          />
          {errors.surname && (
            <p className={styles.errorMessage}>{errors.surname}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            name='password'
            value={values.password}
            onChange={handleChange}
            className={styles.input}
          />
          {errors.password && (
            <p className={styles.errorMessage}>{errors.password}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor='confirmPassword'>Confirm Password:</label>
          <input
            type='password'
            id='confirmPassword'
            name='confirmPassword'
            value={values.confirmPassword}
            onChange={handleChange}
            className={styles.input}
          />
          {passwordMatchError && (
            <p className={styles.errorMessage}>{passwordMatchError}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            name='email'
            value={values.email}
            onChange={handleChange}
            className={styles.input}
          />
          {errors.email && (
            <p className={styles.errorMessage}>{errors.email}</p>
          )}
        </div>

        <PhoneInput
          placeholder='Enter phone number'
          value={String(values.phoneNumber)}
          onChange={(value) => setValues({ ...values, phoneNumber: value })}
        />
        {errors.name && <p className={styles.errorMessage}>{errors.name}</p>}
        <div className={styles.formGroup}>
          <label htmlFor='streetAddress'>Street Address:</label>
          <input
            type='text'
            id='streetAddress'
            name='streetAddress'
            value={values.streetAddress}
            onChange={handleChange}
            className={styles.input}
          />
          {errors.streetAddress && (
            <p className={styles.errorMessage}>{errors.streetAddress}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor='city'>City:</label>
          <input
            type='text'
            id='city'
            name='city'
            value={values.city}
            onChange={handleChange}
            className={styles.input}
          />
          {errors.city && <p className={styles.errorMessage}>{errors.city}</p>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor='country'>Country:</label>
          <input
            type='text'
            id='country'
            name='country'
            value={values.country}
            onChange={handleChange}
            className={styles.input}
          />
          {errors.country && (
            <p className={styles.errorMessage}>{errors.country}</p>
          )}
        </div>

        <button type='submit' className={styles.button}>
          Create Account
        </button>
      </form>
    </div>
  )
}

export default CreateAccountPage
