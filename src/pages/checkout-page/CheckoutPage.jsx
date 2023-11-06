import { useEffect, useState } from 'react'
import { FaTrashAlt, FaArrowLeft } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import {
  removeFromCart,
  updateCartItem,
  removeAllItems,
  selectTotalAmount
} from '../../redux-store/reducers/cartReducer'
import logo from '../../assets/images/logo3.png'
import { useNavigate } from 'react-router-dom'
import classes from './CheckoutPage.module.css'
import { BackToTopButton } from '../../components/buttons/back-to-top-button'
import React from 'react'
import { DecreaseButton } from '../../components/buttons/decrease-button'
import { IncreaseButton } from '../../components/buttons/increase-button'
import { CloseButton } from '../../components/buttons/close-button'
import FormValidator from '../../components/form-validator/FormValidator'
import FormInput from '../../components/form-input/FormInput'

function CheckoutPage() {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const user = useSelector((state) => state.user)
  const totalAmount = useSelector(selectTotalAmount)
  const [quantity, setQuantity] = useState(0)
  const [values, setValues] = useState({
    FirstName: user.name || '',
    LastName: user.surname || '',
    Address: user.streetAddress || '',
    Email: user.email || '',
    MobilePhone:
      user.phone !== undefined && user.phone !== null ? String(user.phone) : '',
    City: user.city || '',
    Country: user.country || ''
  })
  const [errors, setErrors] = useState({})
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('')
  const [formReadyToSubmit, setFormReadyToSubmit] = useState(false)
  const [paymentCardButton, setPaymentCardButton] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const hasErrors = Object.keys(errors).length > 0
    setFormReadyToSubmit(!hasErrors)
  }, [errors])

  useEffect(() => {
    setQuantity(cart.cartItems.reduce((prev, next) => prev + next.quantity, 0))
  }, [cart, user])

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

  const handleSubmit = (event) => {
    event.preventDefault()
    const validationErrors = FormValidator(values)
    const dateToday = new Date()
    if (Object.keys(validationErrors).length === 0) {
      const cartData = [...cart.cartItems]
      const data = {
        UserId: user.id,
        FirstName: values.FirstName,
        LastName: values.LastName,
        Address: values.Address,
        Email: values.Email,
        MobilePhone: values.MobilePhone,
        City: values.city,
        Country: values.country,
        order: cartData,
        totalAmount: totalAmount,
        date: dateToday
      }

      fetch(`https://fluffy-jay-peplum.cyclic.cloud/api/orders/:${user.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Response from server:', data)
          dispatch(removeAllItems())
          setValues({
            FirstName: '',
            LastName: '',
            Address: '',
            Email: '',
            MobilePhone: '',
            City: '',
            Country: ''
          })
          alert('Successfully ordered')
          navigate('/')
        })
        .catch((error) => {
          alert(error.response.data.message)
          console.error('Error:', error)
        })
    } else {
      setErrors(validationErrors)
    }
  }

  const isFormValid = () => {
    const validationErrors = FormValidator(values)
    setErrors(validationErrors)
    setFormReadyToSubmit(Object.keys(validationErrors).length === 0)
    console.log(errors)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }))

    const validationErrors = FormValidator({
      ...values,
      [name]: value
    })

    setErrors(validationErrors)
  }

  return (
    <div className={classes.body}>
      <div className={classes.nav}>
        <img className={classes.img} src={logo} alt='logo' />
        <div>
          <h2>Company name</h2>
        </div>
      </div>

      <BackToTopButton />

      <div className={classes.container}>
        <form className={classes.form}>
          <div className={classes.formGroup}>
            <label>First Name:</label>
            <FormInput
              id='FirstName'
              name='FirstName'
              value={values.FirstName}
              onChange={handleChange}
              error={errors.FirstName}
            />
          </div>
          <div className={classes.formGroup}>
            <label>Last Name:</label>
            <FormInput
              id='LastName'
              name='LastName'
              value={values.LastName}
              onChange={handleChange}
              error={errors.LastName}
            />
          </div>
          <div className={classes.formGroup}>
            <label>Address:</label>
            <FormInput
              id='Address'
              name='Address'
              value={values.Address}
              onChange={handleChange}
              error={errors.Address}
            />
          </div>
          <div className={classes.formGroup}>
            <label>City:</label>
            <FormInput
              id='City'
              name='City'
              value={values.City}
              onChange={handleChange}
              error={errors.City}
            />
          </div>
          <div className={classes.formGroup}>
            <label>Country:</label>
            <FormInput
              id='Country'
              name='Country'
              value={values.Country}
              onChange={handleChange}
              error={errors.Country}
            />
          </div>
          <div className={classes.formGroup}>
            <label>Email:</label>
            <FormInput
              id='Email'
              name='Email'
              type='email'
              value={values.Email}
              onChange={handleChange}
              error={errors.Email}
            />
          </div>
          <div className={classes.formGroup}>
            <label>Mobile Phone:</label>
            <FormInput
              id='MobilePhone'
              name='MobilePhone'
              type='number'
              value={values.MobilePhone}
              onChange={handleChange}
              error={errors.MobilePhone}
            />
          </div>

          {paymentMethod === 'cash' && (
            <button onClick={handleSubmit} disabled={!formReadyToSubmit}>
              Fill the form correctly and submit
            </button>
          )}
          {paymentCardButton && (
            <button
              type='button'
              onClick={() => setPaymentMethod('card')}
              disabled={!formReadyToSubmit}
            >
              Fill the form correctly and proceed
            </button>
          )}
        </form>

        {paymentMethod === 'card' && (
          <div className={classes.cardPaymentForm}>
            <CloseButton
              onClick={() => {
                setPaymentMethod('')
              }}
              isSmall={true}
            />
            <form className={classes.cardForm}>
              <div>
                <label>Card owner name:</label>
                <input id='owner' placeholder='First name and Last name' />
              </div>
              <div>
                <label>Card number:</label>
                <input
                  id='card-number'
                  type='number'
                  placeholder='Card number'
                />
              </div>
              <div>
                <label>Date of expiration:</label>
                <input id='date-of-expiration' placeholder='dd/yy' />
              </div>
              <div>
                <label>CVC</label>
                <input id='cvc' type='number' placeholder='3 digits number' />
              </div>

              <button onClick={handleSubmit} disabled={!formReadyToSubmit}>
                Submit
              </button>
            </form>
          </div>
        )}

        <div className={classes.orderContainer}>
          <div className={classes.back} onClick={() => navigate('/')}>
            <FaArrowLeft />
            <p>Back to menu</p>
          </div>
          <div>
            <h2>Your order</h2>
            <ul className={classes.ul}>
              {cart.cartItems.length > 0 &&
                cart.cartItems.map((item) => (
                  <li key={item.name} className={classes.liBox}>
                    <div className={classes.listBoxDescription}>
                      <img
                        className={classes.imgCheck}
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
            {cart.isDiscounted && (
              <div className={classes.discountMessage}>
                Here is your 20% discount for the first buy!
              </div>
            )}
            <div className={classes.amount}>
              <div>
                <div className={classes.number}>{quantity}</div>
              </div>

              <p>${totalAmount.toFixed(2)}</p>

              <button onClick={() => setShowPaymentModal(true)}>
                Choose payment method
              </button>
            </div>
          </div>
        </div>
      </div>

      {showPaymentModal && (
        <div className={classes.paymentModal}>
          <CloseButton
            onClick={() => {
              setShowPaymentModal(false)
            }}
            isSmall={true}
          />
          <h2>Choose Payment Method</h2>
          <div>
            <button
              onClick={() => {
                setPaymentCardButton(false)
                setPaymentMethod('cash')
                setShowPaymentModal(false)
                isFormValid()
              }}
            >
              Pay with Cash
            </button>
            <button
              onClick={() => {
                setPaymentMethod('')
                setPaymentCardButton(true)
                isFormValid()
                setShowPaymentModal(false)
              }}
              disabled
            >
              Pay with Card
            </button>
          </div>
        </div>
      )}

      <iframe
        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14080.930124383065!2d-82.4210919!3d28.078449149999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88c2c7a1ffcac323%3A0x42dc6a309fa2e214!2sStarbucks!5e0!3m2!1ssr!2sus!4v1696113589874!5m2!1ssr!2sus'
        width='600'
        height='450'
        allowFullScreen=''
        loading='lazy'
        referrerPolicy='no-referrer-when-downgrade'
        title='a'
        className={classes.iframe}
      ></iframe>
    </div>
  )
}

export default CheckoutPage
