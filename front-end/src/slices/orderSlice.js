import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "axios";

export const placeOrder = createAsyncThunk(
  "cart/placeOrder",
  async ({ token, order }, { rejectWithValue }) => {
    try {
      const { data } = await Axios.post("/api/orders", order, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (err) {
      console.log(err.message);
      return rejectWithValue(err.message);
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
      state.loading = false;
      state.success = true;
      state.order = action.payload;
    },
    [placeOrder.rejected]: (state, action) => {
      state.errorMessage = action.payload;
      state.error = true;

      state.loading = false;
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
