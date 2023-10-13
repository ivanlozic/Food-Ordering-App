import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart";
import userReducer from "./authSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
  },
});

export default store;
