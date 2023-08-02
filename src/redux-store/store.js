import { configureStore } from "@reduxjs/toolkit";
import pastaReducer from "./pastaSlice";
import cartReducer from "./cart";
import userReducer from "./authSlice";

const store = configureStore({
  reducer: {
    pastas: pastaReducer,
    cart: cartReducer,
    user: userReducer,
  },
});

export default store;
