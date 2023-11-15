import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styles from './ReviewModal.module.css'
import { useSelector } from 'react-redux'
import { axiosRoutes } from '../../../constants/constants'
import { axiosInstance } from '../../../config/axios'

function ReviewModal({ onClose }) {
  const user = useSelector((state) => state.user)

  const [formData, setFormData] = useState({
    name: user.name + ' ' + user.surname || '',
    stars: 1,
    content: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmitReview = async (e) => {
    e.preventDefault()

    const reviewForm = {
      Author: {
        Name: formData.name
      },
      Stars: formData.stars,
      Content: formData.content,
      UserId: user.id
    }

    try {
      const response = await axiosInstance.post(
        axiosRoutes.userReview.createUserReview,
        reviewForm
      )

      console.log('Review submitted successfully', response.data)

      onClose()
    } catch (error) {
      console.error('Error submitting review', error)
      onClose()
    }
  }
  const handleOutsideClick = (e) => {
    if (e.target.classList.contains(styles.reviewModalOverlay)) {
      onClose()
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={styles.reviewModalOverlay}>
      <div className={styles.reviewModal}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <form onSubmit={handleSubmitReview}>
          <label>
            Name:
            <input type='text' name='name' value={formData.name} readOnly />
          </label>
          <label>
            Stars:
            <select name='stars' value={formData.stars} onChange={handleChange}>
              {[1, 2, 3, 4, 5].map((star) => (
                <option key={star} value={star}>
                  {star}
                </option>
              ))}
            </select>
          </label>
          <label>
            Content (20-100 characters):
            <textarea
              name='content'
              value={formData.content}
              onChange={handleChange}
              minLength='20'
              maxLength='100'
              required
            />
          </label>
          <button type='submit'>Submit Review</button>
        </form>
      </div>
    </div>
  )
}

ReviewModal.propTypes = {
  onClose: PropTypes.func.isRequired
}

export default ReviewModal
