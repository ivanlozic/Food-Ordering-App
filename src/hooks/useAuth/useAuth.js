import { useSelector } from 'react-redux'
import React from 'react'
import ErrorPrompt from '../../components/error-prompt/ErrorPrompt'
import { Link } from 'react-router-dom'
import { routes } from '../../constants/constants'

const useAuth = (Component) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)

  return isLoggedIn ? (
    <Component />
  ) : (
    <>
      <ErrorPrompt errorMessage='You need to be logged in to reach this page.' />
      <Link to={routes.HOME_PAGE} style={linkStyle}>
        <button style={buttonStyle}>Go to Home</button>
      </Link>
    </>
  )
}

export default useAuth

const linkStyle = {
  textDecoration: 'none',
};

const buttonStyle = {
  backgroundColor: '#4CAF50',
  margin:'20px',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '16px',
};
