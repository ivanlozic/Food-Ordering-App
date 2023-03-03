import { configureStore } from "@reduxjs/toolkit";
import pastaReducer from "./pastaSlice";

const store = configureStore({
  reducer: {
    pastas: pastaReducer,
  },
});

export default store;