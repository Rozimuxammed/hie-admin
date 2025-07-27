import { configureStore } from "@reduxjs/toolkit";
import auth from "../slices/auth/auth-slice";
import category from "../slices/category/category-slice";
export const store = configureStore({
  reducer: {
    auth,
    category,
  },
});
