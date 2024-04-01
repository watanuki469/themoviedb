import { createSlice } from "@reduxjs/toolkit";

export const globalLoadingReducer = createSlice({
  name: "loading",
  initialState: {
    globalLoading: false
  },
  reducers: {
    setGlobalLoading: (state, action) => {
      state.globalLoading = action.payload;
    }
  }
});

export const {
  setGlobalLoading
} = globalLoadingReducer.actions;

export default globalLoadingReducer.reducer;