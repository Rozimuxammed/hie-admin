import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
