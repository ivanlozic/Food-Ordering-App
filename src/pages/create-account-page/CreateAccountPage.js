import React, { useState } from 'react'
import styles from './CreateAccountPage.module.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const CreateAccountPage = () => {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatchError,setPasswordMatchError] = useState('');


  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      setPasswordMatchError('Passwords do not match');
      return;
    }

    const userData = {
      name,
      surname,
      email,
      password,
      confirmPassword,
      phoneNumber
    }

  
      try {
        const response = await axios.post('https://fluffy-jay-peplum.cyclic.cloud/users', userData)
        console.log('User registered successfully:', response.data)
        alert('User registered successfully')
        navigate('/')
       
      } catch (error) {
        console.log(error)
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
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}      
            className={styles.input}
          />
          {passwordMatchError && <p className={styles.errorMessage}>{passwordMatchError}</p>}
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
