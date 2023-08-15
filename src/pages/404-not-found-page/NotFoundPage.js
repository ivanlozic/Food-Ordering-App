import React from 'react'

const NotFoundPage = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>404 Not Found</h1>
      <p>The requested page could not be found.</p>
      <p>
        <a href='/'>Go back to the home page</a>
      </p>
    </div>
  )
}

export default NotFoundPage
