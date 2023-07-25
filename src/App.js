import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/home-page/HomePage'
import CheckoutPage from './pages/checkout-page/CheckoutPage'

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='checkout' element={<CheckoutPage />} />
      </Routes>
    </div>
  )
}

export default App
