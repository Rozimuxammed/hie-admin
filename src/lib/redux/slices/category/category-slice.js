// redux/categoriesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  loading: false,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategory: (state, { payload }) => {
      state.categories = payload;
    },
    setLoading: (state) => {
      state.loading = !state.loading;
    },
    addCategory: (state, { payload }) => {
      state.categories.push(payload); // eng oxirga qo‘shish uchun .push
    },
  },
});

export const { setCategory, setLoading, addCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
