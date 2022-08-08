import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "restaurant",
  initialState: {
    inforRes: null,
  },
  reducers: {
    setInfo(state, actions) {
      state.inforRes = actions.payload;
    },
  },
});
export const restaurantReducers = slice.reducer;
export const restaurantActions = slice.actions;
