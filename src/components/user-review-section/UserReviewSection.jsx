import React, { useState } from 'react';
import styles from './UserReviewSection.module.css';

const UserReviewSection = () => {
  const reviews = [
    { content: 'Review 1 content...', author: 'Author 1' },
    { content: 'Review 2 content...', author: 'Author 2' },
    { content: 'Review 3 content...', author: 'Author 3' },
    { content: 'Review 4 content...', author: 'Author 4' },
    { content: 'Review 5 content...', author: 'Author 5' },
    { content: 'Review 6 content...', author: 'Author 6' },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % Math.ceil(reviews.length / 3));
  };

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + Math.ceil(reviews.length / 3)) % Math.ceil(reviews.length / 3));
  };

  const currentReviews = reviews.slice(currentSlide * 3, currentSlide * 3 + 3);

  return (
    <div className={styles.userReviewSection}>
      <h2>User Reviews</h2>
      <div className={styles.slider}>
        {currentReviews.map((review, index) => (
          <div className={styles.review} key={index}>
            <p>{review.content}</p>
            <span className={styles.author}>{review.author}</span>
          </div>
        ))}
      </div>
      <div className={styles.controls}>
        <button onClick={prevSlide}>Previous</button>
        <button onClick={nextSlide}>Next</button>
      </div>
      <div className={styles.buttons}>
        <button className={styles.seeAllBtn}>See All Reviews</button>
        <button className={styles.leaveReviewBtn}>Leave Your Review</button>
      </div>
    </div>
  );
};

export default UserReviewSection;
