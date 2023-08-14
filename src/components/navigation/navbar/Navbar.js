import classes from './Navbar.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { Cart } from '../cart'
import { SideModal } from '../side-modal'
import logo from '../../../assets/images/logo.jpg'
import React from 'react'
import LoginForm from '../login-form/LoginForm'
import { Link } from 'react-router-dom'
import { logout } from '../../../redux-store/authSlice'
import profilePhoto from '../../../assets/images/user.png'

const Navbar = () => {
  const cart = useSelector((state) => state.cart)
  const user = useSelector((state) => state.user)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showLoginForm, setShowLoginForm] = useState(false)
  const dispatch = useDispatch()
  const handleCartClick = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleLoginClick = () => {
    setShowLoginForm(true)
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div className={classes.Navbar}>
      <div className={classes.nav}>
        <div className={classes.headings}>
          <img src={logo} alt='logo' />
          <div>
            <h2>Chicken chill</h2>
            <h4>Feel the chill</h4>
          </div>
        </div>

        {cart.cartItems.length > 0 && <Cart onClick={handleCartClick} />}

        <SideModal isOpen={isModalOpen} onClose={handleCloseModal} />
      </div>

      <ul className={classes.ul}>
        <li className={classes.li}>
          <a href='#pasta'>Pasta meat</a>
        </li>
        <li className={classes.li}>
          <a href='#popcorn'>Popcorn</a>
        </li>
        <li className={classes.li}>
          <a href='#fries-meat'>Fries meat</a>
        </li>
        <li className={classes.li}>
          <a href='#burgers'>Burgers</a>
        </li>
        <li className={classes.li}>
          <a href='#dogs'>Dogs</a>
        </li>
        <li className={classes.li}>
          <a href='#other'>Other</a>
        </li>
        <li className={classes.li}>
          <a href='#drinks'>Drinks</a>
        </li>
      </ul>

      <div className={classes.authButtons}>
        {user.isLoggedIn ? (
          <div className={classes.profileButton}>
            <button>
              <img
                src={profilePhoto}
                alt='Profile'
                className={classes.profilePicture}
              />
            </button>
            <div className={classes.dropdown}>
              <ul>
                <li>
                  <Link to='/myReservationsPage'>My Reservations</Link>
                </li>
                <li>
                  <Link to='/editProfilePage'>Edit Profile</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <>
            <button onClick={handleLoginClick}>Log In</button>
            <Link to='/createAccount'>
              <button>Sign Up</button>
            </Link>
          </>
        )}
      </div>

      {showLoginForm && <LoginForm onClose={() => setShowLoginForm(false)} />}
    </div>
  )
}

export default Navbar
