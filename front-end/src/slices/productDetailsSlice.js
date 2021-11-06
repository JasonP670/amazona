import Axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getProductDetails = createAsyncThunk(
  "productList/getProductDetails",
  async (productId) => {
    const { data } = await Axios.get(`/api/products/${productId}`);
    return data;
  }
);

const initialState = {
  product: {},
  error: false,
  isLoading: false,
};

const options = {
  name: "productDetails",
  initialState,
  reducers: {},
  extraReducers: {
    [getProductDetails.pending]: (state, action) => {
      state.error = false;
      state.isLoading = true;
    },
    [getProductDetails.fulfilled]: (state, action) => {
      state.error = false;
      state.isLoading = false;
      state.product = action.payload;
    },
    [getProductDetails.rejected]: (state, action) => {
      state.error = true;
      state.isLoading = false;
    },
  },
};

const productDetailsSlice = createSlice(options);
export default productDetailsSlice.reducer;
export const selectProductDetails = (state) => state.productDetails;
