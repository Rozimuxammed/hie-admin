// redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, { payload }) {
      state.user = payload;
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("token_created_at");
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
