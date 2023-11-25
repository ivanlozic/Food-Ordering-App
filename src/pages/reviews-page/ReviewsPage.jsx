import React, { useEffect, useState } from 'react'
import Spinner from '../../components/spinner/Spinner'
import styles from './ReviewsPage.module.css'
import { axiosInstance } from '../../config/axios'
import { axiosRoutes, routes } from '../../constants/constants'
import { Link } from 'react-router-dom'

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axiosInstance.get(
          axiosRoutes.userReview.getAllReviews
        )
        setReviews(response.data.data.reviews)

        setLoading(false)
      } catch (error) {
        console.error('Error fetching reviews:', error)
      }
    }

    fetchReviews()
  }, [])

  const reviewsPerPage = 6
  const startIndex = (currentPage - 1) * reviewsPerPage
  const endIndex = startIndex + reviewsPerPage

  const reviewsToDisplay = Array.isArray(reviews)
    ? reviews.slice(startIndex, endIndex)
    : []

  const totalPages = Array.isArray(reviews)
    ? Math.ceil(reviews.length / reviewsPerPage)
    : 0

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  return (
    <div className={styles.container}>
      <Link to={routes.HOME_PAGE} className={styles.backButton}>
        Back to Home Page
      </Link>
      <h1 className={styles.heading}>Customer Reviews</h1>
      {loading ? (
        <Spinner />
      ) : (
        <>
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
                  <span key={i + review.Stars} className={styles.starEmpty}>
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
        </>
      )}
    </div>
  )
}

export default ReviewsPage
