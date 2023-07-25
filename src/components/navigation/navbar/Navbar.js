import classes from './Navbar.module.css'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import Cart from '../cart/Cart'
import SideModal from '../side-modal/SideModal'
import logo from '../../../assets/images/logo.jpg'
import React from 'react'

const Navbar = () => {
  const cart = useSelector((state) => state.cart)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCartClick = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
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
    </div>
  )
}

export default Navbar
