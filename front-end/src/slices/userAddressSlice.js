/* eslint-disable no-undef */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "axios";

export const getAddresses = createAsyncThunk(
  "userAddress/getAddresses",
  async (token) => {
    const { data } = await Axios.get("/api/products", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }
);

const initialState = {
  addresses: {},
  isLoading: true,
  error: false,
};

const options = {
  name: "userAddress",
  initialState,
  reducers: {},
  extraReducers: {
    [getAddresses.pending]: (state, action) => {
      state.error = false;
      state.isLoading = true;
    },
    [getAddresses.fulfilled]: (state, action) => {
      state.error = false;
      state.isLoading = false;
      state.addresses = action.payload;
    },
    [getAddresses.rejected]: (state, action) => {
      state.error = true;
      state.isLoading = false;
    },
  },
};

const userAddressesSlice = createSlice(options);
export default userAddressesSlice.reducer;
export const selectUserAddresses = (state) => state.addresses;
