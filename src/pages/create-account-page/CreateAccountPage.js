import React, { useState } from 'react'
import styles from './CreateAccountPage.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

const CreateAccountPage = () => {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    const userData = {
      name,
      surname,
      email,
      password,
      phoneNumber
    }

    try {
      const response = await axios.post('http://localhost:5000/users', userData)
      console.log('User registered successfully:', response.data)
    } catch (error) {
      console.error('Error registering user:', error.message)
    }
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor='surname'>Surname:</label>
          <input
            type='text'
            id='surname'
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor='phoneNumber'>Phone Number:</label>
          <input
            type='tel'
            id='phoneNumber'
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className={styles.input}
          />
        </div>
        <button type='submit' className={styles.button}>
          Create Account
        </button>
      </form>
    </div>
  )
}

export default CreateAccountPage
