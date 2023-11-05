import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartItems: [],
  isDiscounted: false
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      )
      if (existingItemIndex !== -1) {
        const existingItem = state.cartItems[existingItemIndex]
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + action.payload.quantity,
          totalAmount: existingItem.totalAmount + action.payload.totalAmount
        }
        state.cartItems.splice(existingItemIndex, 1, updatedItem)
      } else {
        state.cartItems.push(action.payload)
      }
    },
    removeFromCart: (state, action) => {
      const index = state.cartItems.findIndex(
        (item) => item.id === action.payload
      )
      if (index !== -1) {
        state.cartItems.splice(index, 1)
      }
    },
    updateCartItem: (state, action) => {
      const index = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      )
      if (index !== -1) {
        state.cartItems[index].quantity = action.payload.quantity
        state.cartItems[index].totalAmount = action.payload.totalAmount
      }
    },
    removeAllItems: (state, action) => {
      state.cartItems = []
    },
    applyDiscount: (state) => {
      state.isDiscounted = true
    },
    removeDiscount: (state) => {
      state.isDiscounted = false

    }
  }
})

export const {
  addToCart,
  removeFromCart,
  updateCartItem,
  removeAllItems,
  applyDiscount,
  removeDiscount
} = cartSlice.actions

export const selectTotalAmount = (state) => {
  const cartItems = state.cart.cartItems
  const isDiscounted = state.cart.isDiscounted

  const totalAmount = cartItems.reduce(
    (prev, next) => prev + next.totalAmount,
    0
  )

  if (isDiscounted) {
    return totalAmount * 0.8
  }

  return totalAmount
}

export default cartSlice.reducer
