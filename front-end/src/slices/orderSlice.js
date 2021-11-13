import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "axios";

export const placeOrder = createAsyncThunk(
  "cart/placeOrder",
  async (order, { rejectWithValue }) => {
    try {
      const { data } = await Axios.post("/api/orders", order);
      return data;
    } catch (err) {
      console.log(err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const detailsOrder = createAsyncThunk(
  "cart/detailsOrder",
  async (orderId) => {
    try {
      const { data } = await Axios.get(`/api/orders/${orderId}`);
      return data;
    } catch (err) {
      return err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    }
  }
);

const initialState = {
  order: {},
  loading: false,
  success: false,
  error: false,
  errorMessage: "",
};

const options = {
  name: "order",
  initialState,
  reducers: {},
  extraReducers: {
    [placeOrder.pending]: (state, action) => {
      state.error = false;
      state.loading = true;
    },
    [placeOrder.fulfilled]: (state, action) => {
      state.error = false;
      state.loading = true;
      state.success = true;
      state.order = action.payload;
    },
    [placeOrder.rejected]: (state, action) => {
      state.errorMessage = action.payload;
      state.error = true;
      state.loading = false;
    },
    [detailsOrder.pending]: (state) => {
      state.loading = true;
      state.error = false;
      state.success = false;
    },
    [detailsOrder.fulfilled]: (state, action) => {
      state.order = action.payload;
      state.loading = false;
      state.error = false;
      state.success = false;
    },
    [detailsOrder.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
      state.errorMessage = action.payload;
      state.success = false;
    },
  },
};

const orderSlice = createSlice(options);
export default orderSlice.reducer;
export const selectOrderState = (state) => state.order;
export const selectOrder = (state) => state.order.order;
export const selectOrderLoading = (state) => state.order.loading;
export const selectOrderSuccess = (state) => state.order.success;
export const selectOrderError = (state) => state.order.error;
