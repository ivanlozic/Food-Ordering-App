import classes from './Navbar.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useState,useEffect,useRef } from 'react'
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

const Navbar = () => {
  const cart = useSelector((state) => state.cart)
  const user = useSelector((state) => state.user)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isDropdownActive, setIsDropdownActive] = useState(false)
  const profileButtonRef = useRef();
  const dispatch = useDispatch()
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
  const handleProfileClick = () => {
    setIsDropdownActive(!isDropdownActive)
  }

  const handleClickOutside = (event) => {
    if (profileButtonRef.current && !profileButtonRef.current.contains(event.target)) {
      setIsDropdownActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className={classes.Navbar}>
      <div>
        <div className={classes.nav}>
          <div className={classes.headings}>
            <div>
              <img src={logo} alt='logo' />
            </div>
          </div>
          <div className={classes.rightSide}>
            {cart.cartItems.length > 0 && <Cart onClick={handleCartClick} />}

            <div className={classes.authButtons}>
              {user.isLoggedIn ? (
                <div ref={profileButtonRef} className={classes.profileButton} onClick={handleProfileClick}>
                  <button>
                    <img
                      src={profilePhoto}
                      alt='Profile'
                      className={classes.profilePicture}
                    />
                  </button>
                  <div className={`${classes.dropdown} ${isDropdownActive ? classes.active : ''}`}>
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
