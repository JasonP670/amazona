import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "axios";

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, qty }, thunkAPI) => {
    const { data } = await Axios.get(`/api/products/${productId}`);
    return {
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      product: data.id,
      qty: qty,
    };
  }
);

// export const placeOrder = createAsyncThunk(
//   "cart/placeOrder",
//   async ({ token, order }, thunkAPI) => {
//     console.log(token);
//     console.log(order);
//     const { data } = await Axios.post("/api/orders", order, {
//       headers: {
//         authorization: `Bearer ${token}`,
//       },
//     });

//     console.log(data);
//     return data;
//   }
// );

const initialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart")).cart
    : [],
  shippingAddress: localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : {},
  paymentMethod: "PayPal",
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
  error: false,
  isLoading: false,
};

const options = {
  name: "cart",
  initialState,
  reducers: {
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (x) => x.product !== action.payload.product
      );
      state.itemsPrice -= action.payload.price * action.payload.qty;
      state.shippingPrice = state.itemsPrice < 100 ? 0 : 10;
      state.taxPrice = state.itemsPrice * 0.2;
      state.totalPrice =
        state.itemsPrice + state.shippingPrice + state.taxPrice;
      console.log(action.payload);
    },
    clearCart: (state, action) => {
      localStorage.removeItem("persist:cart");
      state.itemsPrice = 0;
      state.shippingPrice = 0;
      state.taxPrice = 0;
      state.totalPrice = 0;
      state.cart = [];
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },
    removeShippingAddress: (state) => {
      state.shippingAddress = {};
      localStorage.removeItem("shippingAddress");
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
  },
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

      const toPrice = (num) => Number(num.toFixed(2));
      state.itemsPrice += toPrice(item.price * item.qty);
      state.shippingPrice = state.itemsPrice < 100 ? 0 : 10;
      state.taxPrice = toPrice(0.15 * state.itemsPrice);
      state.totalPrice =
        state.itemsPrice + state.shippingPrice + state.taxPrice;
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
export const selectShippingAddress = (state) => state.cart.shippingAddress;
export const {
  removeFromCart,
  clearCart,
  saveShippingAddress,
  savePaymentMethod,
  removeShippingAddress,
} = cartSlice.actions;
