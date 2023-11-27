import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import Spinner from '../../components/spinner/Spinner'
import { axiosInstance } from '../../config/axios'
import { axiosRoutes, routes } from '../../constants/constants'
import { logout } from '../../redux-store/reducers/authReducer'
import classes from './editProfilePage.module.css'
import ErrorPrompt from '../../components/error-prompt/ErrorPrompt'
import SuccessPrompt from '../../components/success-prompt/SuccessPrompt'

const EditProfilePage = () => {
  const user = useSelector((state) => state.user)
  const [changePassword, setChangePassword] = useState(false)
  const [deleteAccount, setDeleteAccount] = useState(false)
  const [deleteEmail, setDeleteEmail] = useState('')
  const [deletePassword, setDeletePassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showSuccessPrompt, setShowSuccessPrompt] = useState(false);

  const [formData, setFormData] = useState({
    id: user.id,
    name: user.name || '',
    surname: user.surname || '',
    email: user.email || '',
    password: '',
    phone: user.phone || '',
    newPassword: '',
    confirmPassword: '',
    streetAddress: user.streetAddress || '',
    city: user.city || '',
    country: user.country || ''
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user.isLoggedIn && deleteAccount) {
      alert('You must be logged in to delete your account.')
      navigate(routes.HOME_PAGE)
      return
    }
  }, [user.isLoggedIn, deleteAccount, navigate, user])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleDelete = () => {
    setDeleteAccount(true)
  }

  const handleCancelDelete = () => {
    setDeleteAccount(false)
  }

  const handleConfirmDelete = async () => {
    if (user.password === deletePassword) {
      try {
        const response = await axiosInstance.delete(
          `${axiosRoutes.users.deleteUser}/${user.email}`
        )

        if (response.status === 200) {
          dispatch(logout())
          alert('Account deleted successfully')
          navigate(routes.HOME_PAGE)
        } else {
          console.error('Error deleting account:', response.data.message)
        }
      } catch (error) {
        setError(error.message)
        console.error('Axios error:', error)
      }
    } else {
      alert('Your password is not correct')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const updatedProfileData = {
      id: user.id,
      name: formData.name,
      surname: formData.surname,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      streetAddress: formData.streetAddress,
      city: formData.city,
      country: formData.country,
      ...(changePassword && {
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword
      })
    }

    setIsLoading(true)
    try {
      const response = await axiosInstance.put(
        `${axiosRoutes.users.updateUser}`,
        updatedProfileData
      )

      if (response.status === 200) {
        setIsLoading(false)
        setShowSuccessPrompt(true);
      }
    } catch (error) {
      alert(error.response.data.message)
      console.error('Axios error:', error)
    }
  }

  return (
    <div className={classes.container}>
      <Link to={routes.HOME_PAGE} className={classes.backButton}>
        Back to Home Page
      </Link>
      {isLoading && <Spinner />}
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className={classes['form-group']}>
          <label htmlFor='id'>ID:</label>
          <input type='text' id='id' name='id' value={formData.id} disabled />
        </div>
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
        <PhoneInput
          placeholder='Enter phone number'
          value={String(formData.phone)}
          onChange={(value) => {
            setFormData({
              ...formData,
              phone: value
            })
          }}
        />

        <div className={classes['form-group']}>
          <label htmlFor='streetAddress'>Street Address:</label>
          <input
            type='text'
            id='streetAddress'
            name='streetAddress'
            value={formData.streetAddress}
            onChange={handleChange}
          />
        </div>
        <div className={classes['form-group']}>
          <label htmlFor='city'>City:</label>
          <input
            type='text'
            id='city'
            name='city'
            value={formData.city}
            onChange={handleChange}
          />
        </div>
        <div className={classes['form-group']}>
          <label htmlFor='country'>Country:</label>
          <input
            type='text'
            id='country'
            name='country'
            value={formData.country}
            onChange={handleChange}
          />
        </div>

        <div>
          <button type='submit'>Save Changes</button>
        </div>
      </form>

      {deleteAccount ? (
        <div className={classes.deleteAccountPrompt}>
          <p>
            To confirm account deletion, please enter your email and password.
          </p>
          <label>Email:</label>
          <input
            type='email'
            name='email'
            value={deleteEmail}
            onChange={(e) => setDeleteEmail(e.target.value)}
          />
          <label>Password:</label>
          <input
            type='password'
            name='password'
            value={deletePassword}
            onChange={(e) => setDeletePassword(e.target.value)}
          />
          <div>
            <button
              onClick={handleConfirmDelete}
              className={classes.deleteAccountButton}
            >
              Confirm Delete
            </button>
            <button
              onClick={handleCancelDelete}
              className={classes.cancelDeleteButton}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button onClick={handleDelete} className={classes.deleteAccountButton}>
          Delete My Account
        </button>
      )}
      {error && <ErrorPrompt errorMessage={error} />}
      {showSuccessPrompt && (
        <SuccessPrompt
          successMessage='Profile updated successfully!'
          onNavigate={() => {
            dispatch(logout());
            navigate(routes.HOME_PAGE);
          }}
        />
      )}
    </div>
  )
}

export default EditProfilePage
