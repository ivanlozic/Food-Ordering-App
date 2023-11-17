export const axiosRoutes = {
  menu: '/api/menu',
  orders: {
    getOrders: (userId) => `/api/orders/${userId}`,
    createOrder: (userId) => `/api/orders/${userId}`
  },
  users: {
    login: '/api/login',
    getAllUsers: '/users',
    createUser: '/users',
    getUser: (id) => `/users/${id}`,
    updateUser: '/users',
    deleteUser: '/users'
  },
  userReview: {
    getAllReviews: '/api/userReviews',
    createUserReview: '/api/userReviews',
    getUserReviews: '/api/userReviews/:userId',
    deleteUserReview: '/api/userReviews/:userId'
  }
}



