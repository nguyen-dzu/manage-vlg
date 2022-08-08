import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "realtime",
  initialState: {
    orderData: null,
  },
  reducers: {
    setOrder(state, actions) {
      state.orderData = actions.payload;
    },
  },
});
export const orderReducer = slice.reducer;
export const orderActions = slice.actions;
