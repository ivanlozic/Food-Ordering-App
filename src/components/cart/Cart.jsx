import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classes from './Cart.module.css'
import React from 'react'
import { axiosInstance } from '../../config/axios'
import { axiosRoutes } from '../../constants/constants'
import {
  applyDiscount,
  removeDiscount,
  selectTotalAmount
} from '../../redux-store/reducers/cartReducer'

function Cart({ onClick }) {
  const cart = useSelector((state) => state.cart)
  const user = useSelector((state) => state.user)
  const [quantity, setQuantity] = useState(0)
  const totalAmount = useSelector(selectTotalAmount)
  const [reservations, setReservations] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    if (cart.cartItems.length > 0) {
      setQuantity(
        cart.cartItems.reduce((prev, next) => prev + next.quantity, 0)
      )
    } else {
      setQuantity(0)
    }
  }, [cart])

  useEffect(() => {
    axiosInstance
      .get(`${axiosRoutes.orders.getOrders(user.id)}`)
      .then((response) => {
        if (Array.isArray(response.data.data.orders)) {
          const newReservations = response.data.data.orders
          setReservations(newReservations)

          if (newReservations.length === 0) {
            dispatch(applyDiscount())
          } else {
            dispatch(removeDiscount())
          }
        } else {
          console.error('API response is not an array:', response.data)
        }
      })
      .catch((error) => {
        console.error('Error fetching reservations:', error)
      })
  }, [user.id])

  return (
    <div onClick={onClick} className={classes.cart}>
      <div>
        <div className={classes.number}>{quantity}</div>
        <p className={classes.text}>View order</p>
      </div>

      <p className={classes.total}>$ {totalAmount.toFixed(2)}</p>
    </div>
  )
}

export default Cart
