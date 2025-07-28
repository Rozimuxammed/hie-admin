// redux/categoriesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: JSON.parse(localStorage.getItem("categori")) || null,
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
  },
});

export const { setCategory, setLoading } = categoriesSlice.actions;
export default categoriesSlice.reducer;
