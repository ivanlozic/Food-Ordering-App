import React, { useState } from 'react'
import styles from './ErrorPrompt.module.css'

const ErrorPrompt = ({ errorMessage }) => {
  const [isOpen, setIsOpen] = useState(true)

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <>
      {isOpen && (
        <div className={styles.errorPrompt}>
          <span className={styles.closeButton} onClick={handleClose}>
            &times;
          </span>
          <p className={styles.errorMessage}>{errorMessage}</p>
        </div>
      )}
    </>
  )
}

export default ErrorPrompt
