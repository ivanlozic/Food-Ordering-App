import { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import './SideModal.css'
import { FaTrashAlt } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { removeFromCart } from '../../../redux-store/cart'
import { updateCartItem } from '../../../redux-store/cart'
import React from 'react'
import { DecreaseButton } from '../../buttons/decrease-button'
import { IncreaseButton } from '../../buttons/increase-button'
import { useNavigate } from "react-router-dom";


function SideModal(props) {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const user = useSelector((state) => state.user)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const [quantity, setQuantity] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)
  const modalRef = useRef(null)

  const navigate = useNavigate();
  useEffect(() => {
    if (cart.cartItems.length > 0) {
      setQuantity(
        cart.cartItems.reduce((prev, next) => prev + next.quantity, 0)
      )
      setTotalAmount(
        cart.cartItems.reduce((prev, next) => prev + next.totalAmount, 0)
      )
    } else {
      setQuantity(0)
      setTotalAmount(0)
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
    <div className={props.isOpen ? 'modal-overlay open' : 'modal-container'}>
      <div
        className={props.isOpen ? 'modal-container open' : 'modal-container'}
        ref={modalRef}
      >
        <button className='close-button' onClick={props.onClose}>
          X
        </button>
        <h2>Your order</h2>
        <ul className='order-ul'>
          {cart.cartItems.length > 0 &&
            cart.cartItems.map((item) => (
              <li key={item.name} className='li-box'>
                <div className='li-box_description'>
                  <img
                    className='side-modal-img'
                    src={`menu/${item.type}/${item.id}.jpeg`}
                    alt={item.title}
                  />
                  <div>
                    <p>{item.name}</p>
                    <p>RSD {item.totalAmount}.00</p>
                  </div>
                </div>
                <div className='quantity'>
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
                      style={{ color: 'green' }}
                      onClick={() => removeItemFromCart(item.id)}
                    />
                  </div>
                </div>
              </li>
            ))}
        </ul>

        <div className='checkoutCart' onClick={handleCheckoutClick}>
          <div>
            <div className='number'>{quantity}</div>
            <p>Go to checkout</p>
          </div>
          <p>RSD {totalAmount}.00</p>
        </div>

        {showLoginPrompt && (
          <div className='loginPrompt'>
            <p>Please log in to proceed to checkout.</p>
            <button onClick={() => setShowLoginPrompt(false)}>OK</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default SideModal
