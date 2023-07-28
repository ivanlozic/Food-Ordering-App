import React from 'react'
import { Routes, Route } from 'react-router-dom'
import {HomePage} from './pages/home-page'
import {CheckoutPage} from './pages/checkout-page'
import { CreateAccountPage } from './pages/create-account-page'

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='checkout' element={<CheckoutPage />} />
        <Route path='createAccount' element={<CreateAccountPage />} />
      </Routes>
    </div>
  )
}

export default App
