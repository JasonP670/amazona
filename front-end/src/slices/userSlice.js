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

export const getAddresses = createAsyncThunk(
  "user/getAddresses",
  async ({ token, userId }) => {
    const { data } = await Axios.get(`/api/users/address/${userId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return data;
  }
);

export const createAddress = createAsyncThunk(
  "user/createAddress",
  async ({
    token,
    fullName,
    addressLine1,
    addressLine2,
    city,
    postalCode,
    country,
  }) => {
    const body = {
      fullName,
      addressLine1,
      addressLine2,
      city,
      postalCode,
      country,
    };

    const { data } = await Axios.post(`/api/users/address/`, body, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }
);

export const detailsUser = createAsyncThunk("user/detailsUser", async (id) => {
  try {
    console.log(id);
    const { data } = await Axios.get(`/api/users/${id}`);
    console.log(data);
    return data;
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    return message;
  }
});

const options = {
  name: "user",
  initialState: {
    userData: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    userDetails: {},
    addresses: [],
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
    [getAddresses.pending]: (state, action) => {
      state.error = false;
      state.loading = true;
    },
    [getAddresses.fulfilled]: (state, action) => {
      state.error = false;
      state.loading = false;
      state.addresses = action.payload;
    },
    [getAddresses.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    [detailsUser.pending]: (state, action) => {
      state.loading = true;
    },
    [detailsUser.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.userDetails = action.payload;
    },
    [detailsUser.rejected]: (state, action) => {
      state.error = true;
      state.loading = false;
    },
  },
};

const userSlice = createSlice(options);
export default userSlice.reducer;
export const selectUserData = (state) => state.user.userData;
export const selectUserAddress = (state) => state.user.addresses;
export const selectUserLoading = (state) => state.user.loading;
export const selectUserError = (state) => state.user.error;
export const selectUserDetails = (state) => state.user.userDetails;
export const { signout } = userSlice.actions;
