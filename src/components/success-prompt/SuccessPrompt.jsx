import React, { useState } from 'react';
import styles from './SuccessPrompt.module.css';

const SuccessPrompt = ({ successMessage, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleNavigate = () => {
    onNavigate(); 
    handleClose(); 
  };

  return (
    <>
      {isOpen && (
        <div className={styles.successPrompt}>
          <p className={styles.successMessage}>{successMessage}</p>
          <button onClick={handleNavigate}>OK</button>
        </div>
      )}
    </>
  );
};

export default SuccessPrompt;
