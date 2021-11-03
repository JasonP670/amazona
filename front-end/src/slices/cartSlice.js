import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "axios";

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, qty }, thunkAPI) => {
    console.log(productId, qty);
    const { data } = await Axios.get(`/api/products/${productId}`);
    return {
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      product: data._id,
      qty: qty,
    };
  }
);

const initialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart")).cart
    : [],
  error: false,
  isLoading: false,
};

const options = {
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: {
    [addToCart.pending]: (state, action) => {
      state.error = false;
      state.isLoading = true;
    },
    [addToCart.fulfilled]: (state, action) => {
      state.error = false;
      state.isLoading = false;
      const item = action.payload;
      const itemIndex = state.cart.findIndex((x) => x.product === item.product);
      if (itemIndex !== -1) {
        state.cart[itemIndex].qty = action.payload.qty;
      } else {
        state.cart.push(action.payload);
      }
    },
    [addToCart.rejected]: (state, action) => {
      state.error = true;
      state.isLoading = false;
    },
  },
};

const cartSlice = createSlice(options);
export default cartSlice.reducer;
export const selectCart = (state) => state.cart;
export const selectShoppingCart = (state) => state.cart.cart;
