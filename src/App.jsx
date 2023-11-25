import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/home-page'
import { CheckoutPage } from './pages/checkout-page'
import { CreateAccountPage } from './pages/create-account-page'
import { EditProfilePage } from './pages/edit-profile-page'
import { MyReservationsPage } from './pages/my-reservation-page'
import { NotFoundPage } from './pages/404-not-found-page'
import './App.css'
import ReviewsPage from './pages/reviews-page/ReviewsPage'
import { routes } from './constants/constants'
function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path={routes.HOME_PAGE} element={<HomePage />} />
        <Route path={routes.CHECKOUT_PAGE} element={<CheckoutPage />} />
        <Route
          path={routes.CREATE_ACCOUNT_PAGE}
          element={<CreateAccountPage />}
        />
        <Route path={routes.EDIT_PROFILE_PAGE} element={<EditProfilePage />} />
        <Route
          path={routes.MY_RESERVATIONS_PAGE}
          element={<MyReservationsPage />}
        />
        <Route path={routes.REVIEWS_PAGE} element={<ReviewsPage />} />
        <Route path={routes.NOT_FOUND_PAGE} element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

export default App
