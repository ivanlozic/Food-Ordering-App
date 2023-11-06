import React, { useState } from 'react'
import styles from './CreateAccountPage.module.css'
import { Link, useNavigate } from 'react-router-dom'
import 'react-phone-number-input/style.css'
import { axiosRoutes } from '../../constants/constants'
import { axiosInstance } from '../../config/axios'
import FormInput from '../../components/form-input/FormInput'

const CreateAccountPage = () => {
  const [passwordMatchError, setPasswordMatchError] = useState('')
  const [errors, setErrors] = useState({})

  const [values, setValues] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    address: '',
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
    console.log(userData)
    try {
      const response = await axiosInstance.post(
        `${axiosRoutes.users.createUser}`,
        userData
      )
      console.log('User registered successfully:', response.data)

      if (response.status === 201) {
        alert('User registered successfully')
        navigate('/')
      } else {
        console.log('Response does not contain data:', response)
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
    } else {
      setPasswordMatchError('')
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
    if (!values || !values.address || values.address.trim() === '') {
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
        <FormInput
          label='Name'
          name='name'
          type='text'
          value={values.name}
          onChange={handleChange}
          error={errors.name}
        />
        <FormInput
          label='Surname'
          name='surname'
          type='text'
          value={values.surname}
          onChange={handleChange}
          error={errors.surname}
        />
        <FormInput
          label='Password'
          name='password'
          type='password'
          value={values.password}
          onChange={handleChange}
          error={errors.password}
        />
        <FormInput
          label='Confirm Password'
          name='confirmPassword'
          type='password'
          value={values.confirmPassword}
          onChange={handleChange}
          error={passwordMatchError}
        />
        <FormInput
          label='Email'
          name='email'
          type='email'
          value={values.email}
          onChange={handleChange}
          error={errors.email}
        />
        <FormInput
          label='Phone Number'
          name='phoneNumber'
          type='number'
          value={values.phoneNumber}
          onChange={handleChange}
          error={errors.phoneNumber}
        />
        <FormInput
          label='Street Address'
          name='address'
          type='text'
          value={values.address}
          onChange={handleChange}
          error={errors.address}
        />
        <FormInput
          label='City'
          name='city'
          type='text'
          value={values.city}
          onChange={handleChange}
          error={errors.city}
        />
        <FormInput
          label='Country'
          name='country'
          type='text'
          value={values.country}
          onChange={handleChange}
          error={errors.country}
        />

        <button type='submit' className={styles.button}>
          Create Account
        </button>
      </form>
    </div>
  )
}

export default CreateAccountPage
