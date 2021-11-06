import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "axios";

export const signin = createAsyncThunk(
  "user/signin",
  async ({ email, password }) => {
    const { data } = await Axios.post("/api/users/signin", {
      email,
      password,
    });
    return data;
  }
);

export const register = createAsyncThunk(
  "user/register",
  async ({ name, email, password }) => {
    const { data } = await Axios.post("/api/users/register", {
      name,
      email,
      password,
    });
    return data;
  }
);

const options = {
  name: "user",
  initialState: {
    userData: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    error: false,
    loading: false,
  },
  reducers: {
    signout(state) {
      localStorage.removeItem("user");
      state.userData = null;
    },
  },
  extraReducers: {
    [signin.pending]: (state, action) => {
      state.error = false;
      state.loading = true;
    },
    [signin.fulfilled]: (state, action) => {
      state.error = false;
      state.loading = false;
      state.userData = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    [signin.rejected]: (state, action) => {
      state.error = true;
      state.loading = false;
    },
    [register.pending]: (state, action) => {
      state.error = false;
      state.loading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.error = false;
      state.loading = false;
      state.userData = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    [register.rejected]: (state, action) => {
      state.error = true;
      state.loading = false;
    },
  },
};

const userSlice = createSlice(options);
export default userSlice.reducer;
export const selectUserData = (state) => state.user.userData;
export const selectUserLoading = (state) => state.user.loading;
export const selectUserError = (state) => state.user.error;
export const { signout } = userSlice.actions;
