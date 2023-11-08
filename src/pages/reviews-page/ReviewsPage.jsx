import React, { useState } from 'react';
import styles from './ReviewsPage.module.css';

const ReviewsPage = () => {
  const reviews = [
    { content: 'Review 1 content...', author: 'Author 1' },
    { content: 'Review 2 content...', author: 'Author 2' },
    { content: 'Review 3 content...', author: 'Author 3' },
    { content: 'Review 4 content...', author: 'Author 4' },
    { content: 'Review 5 content...', author: 'Author 5' },
    { content: 'Review 6 content...', author: 'Author 6' },
  ];
  const reviewsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * reviewsPerPage;
  const endIndex = startIndex + reviewsPerPage;
  const reviewsToDisplay = reviews.slice(startIndex, endIndex);

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className={styles.container}>
      <h1>Customer Reviews</h1>
      <ul className={styles.reviewList}>
        {reviewsToDisplay.map((review, index) => (
          <li className={styles.reviewItem} key={index}>
            <p>{review.content}</p>
            <p>Author: {review.author}</p>
          </li>
        ))}
      </ul>
      <div className={styles.pagination}>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ReviewsPage;
