/* eslint-disable no-undef */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "axios";

export const getProductList = createAsyncThunk(
  "productList/getProductList",
  async () => {
    const { data } = await Axios.get("/api/products");
    return data;
  }
);

const initialState = {
  products: {},
  isLoading: true,
  error: false,
};

const options = {
  name: "productList",
  initialState,
  reducers: {},
  extraReducers: {
    [getProductList.pending]: (state, action) => {
      state.error = false;
      state.isLoading = true;
    },
    [getProductList.fulfilled]: (state, action) => {
      state.error = false;
      state.isLoading = false;
      state.products = action.payload;
    },
    [getProductList.rejected]: (state, action) => {
      state.error = true;
      state.isLoading = false;
    },
  },
};

const productListSlice = createSlice(options);
export default productListSlice.reducer;
export const selectProductList = (state) => state.productList;
