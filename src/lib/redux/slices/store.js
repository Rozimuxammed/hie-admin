import { configureStore } from "@reduxjs/toolkit";
import auth from "../slices/auth/auth-slice";
export const store = configureStore({
  reducer: {
    auth,
  },
});
