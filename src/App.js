import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/home-page'
import { CheckoutPage } from './pages/checkout-page'
import { CreateAccountPage } from './pages/create-account-page'
import { EditProfilePage } from './pages/edit-profile-page'
import { MyReservationsPage } from './pages/my-reservation-page'

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='checkout' element={<CheckoutPage />} />
        <Route path='createAccount' element={<CreateAccountPage />} />
        <Route path='editProfilePage' element={<EditProfilePage />} />
        <Route path='myReservationsPage' element={<MyReservationsPage />} />
      </Routes>
    </div>
  )
}

export default App
