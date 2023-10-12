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
  }
}
