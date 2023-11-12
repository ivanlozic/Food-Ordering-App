import React, { useState } from 'react'
import styles from './UserReviewSection.module.css'
import { Link } from 'react-router-dom'
import LoginPrompt from '../loginPrompt/LoginPrompt'
import { useSelector } from 'react-redux'
import ReviewModal from './review-modal/ReviewModal'

const UserReviewSection = () => {
  const reviews = [
    {
      author: {
        name: 'Author 1'
      },
      content: 'Review 1 content...',
      stars: 4
    },
    {
      author: {
        name: 'Author 2'
      },
      content: 'Review 2 content...',
      stars: 5
    },
    {
      author: {
        name: 'Author 3'
      },
      content: 'Review 3 content...',
      stars: 3
    },
    {
      author: {
        name: 'Author 4'
      },
      content: 'Review 4 content...',
      stars: 3
    },
    {
      author: {
        name: 'Author 5'
      },
      content: 'Review 5 content...',
      stars: 3
    },
    {
      author: {
        name: 'Author 6'
      },
      content: 'Review 6 content...',
      stars: 3
    }
  ]
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showReviewModal, setShowReviewModal] = useState(false);
  const user = useSelector((state) => state.user)


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
      setShowReviewModal(true);
    } else {
      setShowLoginPrompt(true);
    }
  };
  

  const startReviewIndex = currentSlide
  const endReviewIndex = Math.min(currentSlide + 3, reviews.length)
  const currentReviews = reviews.slice(startReviewIndex, endReviewIndex)
  return (
    <div className={styles.userReviewSection}>
      <h2>User Reviews</h2>
      <div className={styles.slider}>
        <div className={styles.arrowLeft} onClick={prevSlide}>
          &#8592;
        </div>
        {currentReviews.map((review, index) => (
          <div className={styles.review} key={index}>
            <div className={styles.authorInfo}>
              <span className={styles.authorName}>{review.author.name}</span>
            </div>
            <div className={styles.reviewContent}>
              <p>{review.content}</p>
              <div className={styles.starRatings}>
                {Array.from({ length: review.stars }).map((_, i) => (
                  <span key={i} className={styles.star}>
                    &#9733;
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
        <div className={styles.arrowRight} onClick={nextSlide}>
          &#8594;
        </div>
      </div>
      <div className={styles.buttons}>
        <Link to='/reviewsPage'>
          <button className={styles.seeAllBtn}>See All Reviews</button>
        </Link>
        <button className={styles.leaveReviewBtn } onClick={openReviewModal}>Leave Your Review</button>
      </div>

      {showLoginPrompt && <LoginPrompt onClose={() => setShowLoginPrompt(false)} />}
      {showReviewModal && <ReviewModal onClose={() => setShowReviewModal(false)} />}


    </div>
  )
}

export default UserReviewSection
