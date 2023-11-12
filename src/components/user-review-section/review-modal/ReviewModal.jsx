// ReviewModal.js
import React from 'react';
import PropTypes from 'prop-types';
import styles from './ReviewModal.module.css'; // Import your styles
import axios from 'axios'; // Import Axios or your preferred HTTP library

function ReviewModal({ onClose }) {
  // Add your review form JSX and logic here

  const handleSubmitReview = async (reviewData) => {
    try {
      // Use Axios to post the review data to your server
      const response = await axios.post('/api/reviews', reviewData);

      console.log('Review submitted successfully', response.data);

    
      onClose();
    } catch (error) {
      console.error('Error submitting review', error);

      onClose();
    }
  };

  return (
    <div className={styles.reviewModal}>
        
    </div>
  );
}

ReviewModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ReviewModal;
