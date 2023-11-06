import React from 'react'
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>&copy; 2023 Ivan Lozic</p>
      </div>
    </footer>
  )
}

export default Footer
