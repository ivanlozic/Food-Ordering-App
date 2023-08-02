import React, { useState } from 'react'
import classes from './myReservationsPage.module.css'

const MyReservationsPage = () => {
  const reservations = useState([])

  return (
    <div className={classes.container}>
      <h2>My Reservations</h2>
      {reservations.length === 0 ? (
        <p className={classes.noReservations}>No reservations found.</p>
      ) : (
        <ul className={classes.reservationList}>
          {reservations.map((reservation) => (
            <li key={reservation.id} className={classes.reservationItem}>
              <h3>Reservation ID: {reservation.id}</h3>
              <p>Date: {reservation.date}</p>
              <p>Time: {reservation.time}</p>
              <p>Restaurant: {reservation.restaurant}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default MyReservationsPage
