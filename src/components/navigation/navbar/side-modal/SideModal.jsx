import { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import classes from './SideModal.module.css'
import { FaTrashAlt } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import {
  removeFromCart,
  selectTotalAmount
} from '../../../../redux-store/reducers/cartReducer'
import { updateCartItem } from '../../../../redux-store/reducers/cartReducer'
import React from 'react'
import { DecreaseButton } from '../../../buttons/decrease-button'
import { IncreaseButton } from '../../../buttons/increase-button'
import { useNavigate } from 'react-router-dom'
import LoginPrompt from '../../../loginPrompt/LoginPrompt'

function SideModal(props) {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const user = useSelector((state) => state.user)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const [quantity, setQuantity] = useState(0)
  const totalAmount = useSelector(selectTotalAmount)
  const modalRef = useRef(null)

  const navigate = useNavigate()
  useEffect(() => {
    if (cart.cartItems.length > 0) {
      setQuantity(
        cart.cartItems.reduce((prev, next) => prev + next.quantity, 0)
      )
    } else {
      setQuantity(0)
      props.onClose()
    }
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        props.onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [cart, props])

  function removeItemFromCart(id) {
    dispatch(removeFromCart(id))
  }
  function increaseItemFromCart(id) {
    const existingItem = cart.cartItems.find((item) => item.id === id)
    const updatedItem = {
      ...existingItem,
      quantity: existingItem.quantity + 1,
      totalAmount: existingItem.totalAmount + existingItem.price
    }
    dispatch(updateCartItem(updatedItem))
  }
  function decreaseItemFromCart(id) {
    const existingItem = cart.cartItems.find((item) => item.id === id)
    if (existingItem.quantity > 1) {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
        totalAmount: existingItem.totalAmount - existingItem.price
      }
      dispatch(updateCartItem(updatedItem))
    } else {
      dispatch(removeFromCart(id))
    }
  }

  const handleCheckoutClick = () => {
    if (user.isLoggedIn) {
      navigate('/checkout')
    } else {
      setShowLoginPrompt(true)
    }
  }

  return (
    <div
      className={
        props.isOpen
          ? classes.modalOverlay + ' ' + classes.open
          : classes.modalContainer
      }
    >
      <div
        className={
          props.isOpen
            ? classes.modalContainer + ' ' + classes.open
            : classes.modalContainer
        }
        ref={modalRef}
      >
        <button className={classes.closeButton} onClick={props.onClose}>
          X
        </button>
        <h2>Your order</h2>
        <ul className={classes.orderList}>
          {cart.cartItems.length > 0 &&
            cart.cartItems.map((item) => (
              <li key={item.name} className={classes.listBox}>
                <div className={classes.listBoxDescription}>
                  <img
                    className={classes.sideModalImage}
                    src={`menu/${item.type}/${item.id}.jpeg`}
                    alt={item.title}
                  />
                  <div>
                    <p>{item.name}</p>
                    <p>${item.totalAmount.toFixed(2)}</p>
                  </div>
                </div>
                <div className={classes.quantity}>
                  <DecreaseButton
                    onClick={() => decreaseItemFromCart(item.id)}
                    disabled={item.quantity === 1}
                  />
                  {item.quantity}
                  <IncreaseButton
                    onClick={() => increaseItemFromCart(item.id)}
                  />
                  <div>
                    <FaTrashAlt
                      style={{ color: '#2375cd' }}
                      onClick={() => removeItemFromCart(item.id)}
                    />
                  </div>
                </div>
              </li>
            ))}
        </ul>

        <div className={classes.checkoutCart} onClick={handleCheckoutClick}>
          <div>
            <div className={classes.number}>{quantity}</div>
            <p>Go to checkout</p>
          </div>
          <p>${totalAmount.toFixed(2)}</p>
        </div>

        {cart.isDiscounted && (
          <div className={classes.discountMessage}>
            Here is your 20 discount for the first buy!
          </div>
        )}

        {showLoginPrompt && (
          <LoginPrompt onClose={() => setShowLoginPrompt(false)} />
        )}
      </div>
    </div>
  )
}

export default SideModal
