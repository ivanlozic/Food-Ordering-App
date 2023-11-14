import React, { useEffect, useState } from 'react'
import classes from './myReservationsPage.module.css'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { axiosInstance } from '../../config/axios'
import { axiosRoutes } from '../../constants/constants'
import ErrorPrompt from '../../components/error-prompt/ErrorPrompt'

const MyReservationsPage = () => {
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [filteredReservations, setFilteredReservations] = useState([])
  const [error, setError] = useState(null)
  const user = useSelector((state) => state.user)

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString)
    const day = dateObject.getDate()
    const month = dateObject.getMonth() + 1
    const year = dateObject.getFullYear()
    return `${month.toString().padStart(2, '0')}/${day
      .toString()
      .padStart(2, '0')}/${year}`
  }

  useEffect(() => {
    axiosInstance
      .get(`${axiosRoutes.orders.getOrders(user.id)}`)
      .then((response) => {
        if (Array.isArray(response.data.data.orders)) {
          setReservations(response.data.data.orders)
          setLoading(false)
        } else {
          console.error('API response is not an array:', response.data)
          setLoading(false)
        }
      })
      .catch((error) => {
        setError('Error fetching reservations. Please try again later.')
        console.error('Error fetching reservations:', error)
        setLoading(false)
      })
  }, [user.id])

  useEffect(() => {
    if (selectedFilter === 'today') {
      filterReservationsByToday()
    } else if (selectedFilter === 'yesterday') {
      filterReservationsByYesterday()
    } else if (selectedFilter === 'lastWeek') {
      filterReservationsByLastWeek()
    } else if (selectedFilter === 'lastMonth') {
      filterReservationsByLastMonth()
    } else {
      setFilteredReservations(reservations)
    }
  }, [selectedFilter, reservations])

  const filterReservationsByToday = () => {
    const today = new Date()
    const filteredReservations = reservations.filter((reservation) => {
      const reservationDate = new Date(reservation.date)
      return (
        reservationDate.getDate() === today.getDate() &&
        reservationDate.getMonth() === today.getMonth() &&
        reservationDate.getFullYear() === today.getFullYear()
      )
    })
    setFilteredReservations(filteredReservations)
  }

  const filterReservationsByYesterday = () => {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const filteredReservations = reservations.filter((reservation) => {
      const reservationDate = new Date(reservation.date)
      return (
        reservationDate.getDate() === yesterday.getDate() &&
        reservationDate.getMonth() === yesterday.getMonth() &&
        reservationDate.getFullYear() === yesterday.getFullYear()
      )
    })
    setFilteredReservations(filteredReservations)
  }

  const filterReservationsByLastWeek = () => {
    const endDate = new Date()
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - 7)

    const filteredReservations = reservations.filter((reservation) => {
      const reservationDate = new Date(reservation.date)
      return reservationDate >= startDate && reservationDate <= endDate
    })
    setFilteredReservations(filteredReservations)
  }

  const filterReservationsByLastMonth = () => {
    const endDate = new Date()
    const startDate = new Date()
    startDate.setMonth(startDate.getMonth() - 1)

    const filteredReservations = reservations.filter((reservation) => {
      const reservationDate = new Date(reservation.date)
      return reservationDate >= startDate && reservationDate <= endDate
    })
    setFilteredReservations(filteredReservations)
  }

  return (
    <div className={classes.container}>
      <Link to='/' className={classes.backButton}>
        Back to Home Page
      </Link>
      <h2 className={classes.heading}>My Reservations</h2>

      <select
        value={selectedFilter}
        onChange={(e) => setSelectedFilter(e.target.value)}
        className={classes.filterOptions}
      >
        <option value='all'>All</option>
        <option value='today'>Today</option>
        <option value='yesterday'>Yesterday</option>
        <option value='lastWeek'>Last Week</option>
        <option value='lastMonth'>Last Month</option>
      </select>
      {loading ? (
        <p className={classes.loading}>Loading...</p>
      ) : reservations.length === 0 ? (
        <p className={classes.noReservations}>No reservations found.</p>
      ) : (
        <ul className={classes.reservationList}>
          {filteredReservations.map((reservation) => (
            <li key={reservation._id} className={classes.reservationItem}>
              <h3>Reservation ID: {reservation.reservationId}</h3>
              <p>Date: {formatDate(reservation.date)}</p>
              <p>Restaurant: Your Company Name</p>
              <ul>
                {reservation.order.map((item) => (
                  <li key={item.name} className={classes.liBox}>
                    <div className={classes.item}>
                      <img
                        className={classes.imgCheck}
                        src={`menu/${item.type}/${item.id}.jpeg`}
                        alt={item.title}
                      />
                      <div>
                        <p>
                          {item.name} x {item.quantity}
                        </p>
                        <p>{item.totalAmount}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div>
                {reservations.length === 1
                  ? 'Total Amount with discount'
                  : 'Total Amount'}
                : ${reservation.totalAmount.toFixed(2)}
              </div>
            </li>
          ))}
        </ul>
      )}

      {error && <ErrorPrompt errorMessage={error} />}
    </div>
  )
}

export default MyReservationsPage
