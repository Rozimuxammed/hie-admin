// redux/categoriesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategory: (state, { payload }) => {
      state.categories = payload;
    },
  },
});

export const { setCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
