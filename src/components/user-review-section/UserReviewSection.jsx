import React, { useEffect, useState } from 'react'
import styles from './UserReviewSection.module.css'
import { Link } from 'react-router-dom'
import LoginPrompt from '../loginPrompt/LoginPrompt'
import { useSelector } from 'react-redux'
import ReviewModal from './review-modal/ReviewModal'
import ReviewItem from './review-item/ReviewItem'
import { axiosInstance } from '../../config/axios'
import { axiosRoutes } from '../../constants/constants'

const UserReviewSection = () => {
  const [reviews, setReviews] = useState([])
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showReviewModal, setShowReviewModal] = useState(false)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axiosInstance.get(
          axiosRoutes.userReview.getAllReviews
        )

        setReviews(response.data.data.reviews)
        console.log(response.data.data)
        console.log(reviews)
      } catch (error) {
        console.error('Error fetching reviews:', error)
      }
    }

    fetchReviews()
  }, [])
  const startReviewIndex = currentSlide
  const endReviewIndex = Math.min(currentSlide + 3, reviews.length)
  const currentReviews = Array.isArray(reviews)
    ? reviews.slice(startReviewIndex, endReviewIndex)
    : []

  const nextSlide = () => {
    if (currentSlide < reviews.length - 3) {
      setCurrentSlide(currentSlide + 1)
    } else {
      setCurrentSlide(0)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    } else {
      setCurrentSlide(reviews.length - 3)
    }
  }

  const openReviewModal = () => {
    if (user.isLoggedIn) {
      setShowReviewModal(true)
    } else {
      setShowLoginPrompt(true)
    }
  }

  return (
    <div className={styles.userReviewSection}>
      <h2>User Reviews</h2>
      <div className={styles.slider}>
        <div className={styles.arrowLeft} onClick={prevSlide}>
          &#8592;
        </div>
        {currentReviews.map((review, index) => (
          <ReviewItem key={index} review={review} />
        ))}
        <div className={styles.arrowRight} onClick={nextSlide}>
          &#8594;
        </div>
      </div>
      <div className={styles.buttons}>
        <Link to='/reviewsPage'>
          <button className={styles.seeAllBtn}>See All Reviews</button>
        </Link>
        <button className={styles.leaveReviewBtn} onClick={openReviewModal}>
          Leave Your Review
        </button>
      </div>

      {showLoginPrompt && (
        <LoginPrompt onClose={() => setShowLoginPrompt(false)} />
      )}
      {showReviewModal && (
        <ReviewModal onClose={() => setShowReviewModal(false)} />
      )}
    </div>
  )
}

export default UserReviewSection
