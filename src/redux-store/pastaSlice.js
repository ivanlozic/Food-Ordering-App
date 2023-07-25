import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pastas: [],
};

export const pastaSlice = createSlice({
  name: "pasta",
  initialState,
  reducers: {
    addPasta: (state, action) => {
      state.pastas.push(action.payload);
    },
    removePasta: (state, action) => {
      state.pastas = state.pastas.filter((pasta) => pasta.id !== action.payload);
    },
  },
});

export const { addPasta, removePasta } = pastaSlice.actions;

export default pastaSlice.reducer;
