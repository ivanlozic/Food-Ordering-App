import { configureStore } from "@reduxjs/toolkit";
import pastaReducer from "./pastaSlice";
import cartReducer from './cart'

const store = configureStore({
  reducer: {
    pastas: pastaReducer,
    cart: cartReducer
  },
});

export default store;