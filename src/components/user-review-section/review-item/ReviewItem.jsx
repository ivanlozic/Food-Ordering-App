import React from 'react'
import styles from '../UserReviewSection.module.css'

const ReviewItem = ({ review, index }) => {
  const filledStars = Array.from({ length: review.Stars }).map((_, i) => (
    <span key={i} className={styles.starFilled}>
      &#9733;
    </span>
  ))

  const emptyStars = Array.from({ length: 5 - review.Stars }).map((_, i) => (
    <span key={i} className={styles.starEmpty}>
      &#9733;
    </span>
  ))

  return (
    <div className={styles.review} >
      <div className={styles.authorInfo}>
        <span className={styles.authorName}>{review.Author.Name}</span>
      </div>
      <div className={styles.reviewContent}>
        <p>{review.Content}</p>
        <div className={styles.starRatings}>
          {filledStars}
          {emptyStars}
        </div>
      </div>
    </div>
  )
}

export default ReviewItem
