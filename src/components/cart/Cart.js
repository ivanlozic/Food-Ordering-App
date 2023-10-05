import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import classes from './Cart.module.css'
import React from 'react'

function Cart({ onClick }) {
  const cart = useSelector((state) => state.cart)
  const [quantity, setQuantity] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)

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
    }
  }, [cart])

  return (
    <div onClick={onClick} className={classes.cart}>
      <div>
        <div className={classes.number}>{quantity}</div>
        <p className={classes.text}>View order</p>
      </div>

      <p className={classes.total}>$ {totalAmount}</p>
    </div>
  )
}

export default Cart
