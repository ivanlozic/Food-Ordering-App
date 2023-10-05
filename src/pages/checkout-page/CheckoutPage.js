import { useEffect, useState } from 'react'
import { FaTrashAlt, FaArrowLeft } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import {
  removeFromCart,
  updateCartItem,
  removeAllItems
} from '../../redux-store/cart'
import logo from '../../assets/images/logo3.png'
import { useNavigate } from 'react-router-dom'
import classes from './CheckoutPage.module.css'
import { BackToTopButton } from '../../components/buttons/back-to-top-button'
import React from 'react'
import { DecreaseButton } from '../../components/buttons/decrease-button'
import { IncreaseButton } from '../../components/buttons/increase-button'
import { SubmitButton } from '../../components/buttons/submit-button'
import { fetchUser } from '../../redux-store/authSlice'
import { CloseButton } from '../../components/buttons/close-button'

function CheckoutPage() {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const user = useSelector((state) => state.user)
  const [totalAmount, setTotalAmount] = useState(0)
  const [quantity, setQuantity] = useState(0)
  const [values, setValues] = useState({
    FirstName: '',
    LastName: '',
    Address: '',
    Email: '',
    MobilePhone: ''
  })
  const [errors, setErrors] = useState({})
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('')
  const [formReadyToSubmit, setFormReadyToSubmit] = useState(false)
  const [paymentCardButton, setPaymentCardButton] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    if (user.id) {
      dispatch(fetchUser(user.id))
    }
  }, [dispatch, user])

  useEffect(() => {
    const hasErrors = Object.keys(errors).length > 0
    setFormReadyToSubmit(!hasErrors)
  }, [errors])

  useEffect(() => {
    setValues({
      FirstName: user.name || '',
      LastName: user.surname || '',
      Email: user.email || '',
      MobilePhone: user.phone || ''
    })
    setTotalAmount(
      cart.cartItems.reduce((prev, next) => prev + next.totalAmount, 0)
    )
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
    const validationErrors = validate()
    if (Object.keys(validationErrors).length === 0) {
      const cartData = [...cart.cartItems]
      const data = {
        FirstName: values.FirstName,
        LastName: values.LastName,
        Address: values.Address,
        Email: values.Email,
        MobilePhone: values.MobilePhone,
        order: cartData,
        totalAmount: totalAmount
      }

      fetch('https://fluffy-jay-peplum.cyclic.cloud/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then((response) => {
          dispatch(removeAllItems())
          setValues({
            FirstName: '',
            LastName: '',
            Address: '',
            Email: '',
            MobilePhone: ''
          })
          alert('Succesfully ordered')
          navigate('/')
          console.log(response)
        })
        .catch((error) => {
          console.error(error)
        })
    } else {
      setErrors(validationErrors)
    }
  }

  const handleCashPayment = () => {
    const cartData = [...cart.cartItems]
    console.log(cartData, 'dasda')
  }

  // Perform form input validation

  /*

  const handleSubmit = (event) => {
    event.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length === 0) {
      const cartData = [...cart.cartItems]
      const data = {
        FirstName: values.FirstName,
        LastName: values.LastName,
        Address: values.Address,
        Email: values.Email,
        MobilePhone: values.MobilePhone,
        order: cartData,
        totalAmount: totalAmount
      }

      fetch('http://localhost:5000/api/orders', {
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
            MobilePhone: ''
          })
          alert('Successfully ordered')
          navigate('/')
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    } else {
      setErrors(validationErrors)
    }
  }

  */
  const handlePaymentSubmit = (event) => {
    event.preventDefault()
    const validationErrors = validate()

    if (paymentMethod === 'cash') {
      if (Object.keys(validationErrors).length === 0) {
        handleCashPayment()
      } else {
        setErrors(validationErrors)
      }
    } else if (paymentMethod === 'card') {
      setShowPaymentModal(true)
    }
  }
  const validate = (values) => {
    let errors = {}
    if (!values.FirstName) {
      errors.FirstName = 'First Name is required'
    } else if (values.FirstName[0].toUpperCase() !== values.FirstName[0]) {
      errors.FirstName = 'First name should start with an uppercase letter'
    }
    if (!values.LastName) {
      errors.LastName = 'Last Name is required'
    } else if (values.LastName[0].toUpperCase() !== values.LastName[0]) {
      errors.LastName = 'Last name should start with an uppercase letter'
    }
    if (!values.Address) {
      errors.Address = 'Address is required'
    }
    if (!values.Email) {
      errors.Email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(values.Email)) {
      errors.Email = 'Invalid email address'
    }
    if (!values.MobilePhone) {
      errors.MobilePhone = 'Mobile Phone is required'
    } else if (
      !/^[0-9]+$/.test(values.MobilePhone) ||
      values.MobilePhone.length < 11
    ) {
      errors.MobilePhone = 'Mobile Phone must have at least 11-digits'
    }
    return errors
  }

  const isFormValid = () => {
    const validationErrors = validate(values)
    setErrors(validationErrors)
    setFormReadyToSubmit(Object.keys(validationErrors).length === 0)
    console.log(errors)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((prevValues) => ({ ...prevValues, [name]: value }))
    const validationErrors = validate({ ...values, [name]: value })
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
            <input
              name='FirstName'
              onChange={handleChange}
              value={values.FirstName}
            />
            {errors.FirstName && (
              <div className={classes.error}>{errors.FirstName}</div>
            )}
          </div>
          <div className={classes.formGroup}>
            <label>Last Name:</label>
            <input
              name='LastName'
              onChange={handleChange}
              value={values.LastName}
            />
            {errors.LastName && (
              <div className={classes.error}>{errors.LastName}</div>
            )}
          </div>
          <div className={classes.formGroup}>
            <label>Address:</label>
            <input
              name='Address'
              onChange={handleChange}
              value={values.Address}
            />
            {errors.Address && (
              <div className={classes.error}>{errors.Address}</div>
            )}
          </div>
          <div className={classes.formGroup}>
            <label>Email:</label>
            <input
              name='Email'
              type='email'
              onChange={handleChange}
              value={values.Email}
            />
            {errors.Email && (
              <div className={classes.error}>{errors.Email}</div>
            )}
          </div>
          <div className={classes.formGroup}>
            <label>Mobile Phone:</label>
            <input
              name='MobilePhone'
              onChange={handleChange}
              value={values.MobilePhone}
              type='number'
            />
            {errors.MobilePhone && (
              <div className={classes.error}>{errors.MobilePhone}</div>
            )}
          </div>

          {paymentMethod === 'cash' && (
            <button onClick={handlePaymentSubmit} disabled={!formReadyToSubmit}>
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

              <button
                onClick={handlePaymentSubmit}
                disabled={!formReadyToSubmit}
              >
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
                    <div className='li-box_description'>
                      <img
                        className={classes.imgCheck}
                        src={`menu/${item.type}/${item.id}.jpeg`}
                        alt={item.title}
                      />
                      <div>
                        <p>{item.name}</p>
                        <p>${item.totalAmount}</p>
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
                          style={{ color: '#2375cd' }}
                          onClick={() => removeItemFromCart(item.id)}
                        />
                      </div>
                    </div>
                  </li>
                ))}
            </ul>

            <div className={classes.amount}>
              <div>
                <div className='number'>{quantity}</div>
              </div>

              <p>${totalAmount}</p>

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
