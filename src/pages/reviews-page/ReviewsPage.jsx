import React, { useEffect, useState } from 'react'
import styles from './ReviewsPage.module.css'
import axios from 'axios'

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/api/userReviews'
        )
        setReviews(response.data.data.reviews)
      } catch (error) {
        console.error('Error fetching reviews:', error)
      }
    }

    fetchReviews()
  }, [])

  const reviewsPerPage = 6
  const startIndex = (currentPage - 1) * reviewsPerPage
  const endIndex = startIndex + reviewsPerPage
  const reviewsToDisplay = reviews.slice(startIndex, endIndex)
  const totalPages = Math.ceil(reviews.length / reviewsPerPage)

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  return (
    <div className={styles.container}>
      <h1>Customer Reviews</h1>
      <ul className={styles.reviewList}>
        {reviewsToDisplay.map((review, index) => {
          const filledStars = Array.from({ length: review.Stars }).map(
            (_, i) => (
              <span key={i} className={styles.starFilled}>
                &#9733;
              </span>
            )
          )

          const emptyStars = Array.from({ length: 5 - review.Stars }).map(
            (_, i) => (
              <span key={i + review.stars} className={styles.starEmpty}>
                &#9733;
              </span>
            )
          )

          return (
            <li className={styles.reviewItem} key={index}>
              <p>Author: {review.Author.Name}</p>
              <p>{review.Content}</p>
              
              <div className={styles.starRating}>
                {filledStars}
                {emptyStars}
              </div>
            </li>
          )
        })}
      </ul>
      <div className={styles.pagination}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default ReviewsPage
