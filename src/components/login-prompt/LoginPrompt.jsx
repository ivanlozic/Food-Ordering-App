import React from 'react'
import classes from './LoginPrompt.module.css' 

const LoginPrompt = ({ onClose }) => {
  return (
    <div className={classes.loginPrompt}>
      <p>Please log in to proceed to checkout.</p>
      <button onClick={onClose}>OK</button>
    </div>
  )
}

export default LoginPrompt
