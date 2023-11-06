import classes from './Navbar.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { Cart } from '../../cart'
import { SideModal } from './side-modal'
import logo from '../../../assets/images/logo3.png'
import React from 'react'
import LoginForm from './login-form/LoginForm'
import { Link } from 'react-router-dom'
import { logout } from '../../../redux-store/reducers/authReducer'
import profilePhoto from '../../../assets/images/user.png'
import Modal from 'react-modal'
import { CloseButton } from '../../buttons/close-button'

const Navbar = ({ onSearch }) => {
  const cart = useSelector((state) => state.cart)
  const user = useSelector((state) => state.user)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const dispatch = useDispatch()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  const handleCartClick = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }
  const handleLogout = () => {
    localStorage.removeItem('authToken')
    dispatch(logout())
  }

  const openLoginModal = () => {
    setIsLoginModalOpen(true)
  }

  const closeLoginModal = () => {
    setIsLoginModalOpen(false)
  }

  const handleSearchInputChange = (e) => {
    const newQuery = e.target.value
    setSearchQuery(newQuery)

    onSearch(newQuery)
  }

  return (
    <div className={classes.Navbar}>
      <div>
        <div className={classes.nav}>
          <div className={classes.headings}>
            <div>
              <img src={logo} alt='logo' />
            </div>
            <button className={classes.menuToggle} onClick={toggleMenu}>
              Menu
            </button>{' '}
            <input
              type='text'
              placeholder='Search for meals and drinks by name'
              value={searchQuery}
              onChange={handleSearchInputChange}
              className={classes.searchInput}
            />
          </div>

          <div className={classes.rightSide}>
            {cart.cartItems.length > 0 && <Cart onClick={handleCartClick} />}

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
                  <button onClick={openLoginModal}>Log In</button>
                  <Link to='/createAccount'>
                    <button>Sign Up</button>
                  </Link>
                </>
              )}
            </div>
          </div>
          {showLoginForm && (
            <LoginForm onClose={() => setShowLoginForm(false)} />
          )}
        </div>
      </div>
      <div className={` ${isMenuOpen ? classes.ulBox : ''}`}>
        <ul className={`${classes.ul} ${isMenuOpen ? classes.active : ''}`}>
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
      </div>

      <Modal
        isOpen={isLoginModalOpen}
        onRequestClose={closeLoginModal}
        contentLabel='Login Modal'
        ariaHideApp={false}
        className={classes.Modal}
      >
        <CloseButton onClick={closeLoginModal} />
        <LoginForm onClose={() => setIsLoginModalOpen(false)} />
      </Modal>

      <SideModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  )
}

export default Navbar
