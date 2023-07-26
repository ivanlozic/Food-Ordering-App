import React from 'react'

const SubmitButton = ({ type = 'button', onClick, children }) => {
  return (
    <button type={type} onClick={onClick}>
      {children}
    </button>
  )
}

export default SubmitButton
