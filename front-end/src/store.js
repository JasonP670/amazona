import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import productListReducer from "./slices/productListSlice";
import productDetailsReducer from "./slices/productDetailsSlice";
import cartReducer from "./slices/cartSlice";
import userReducer from "./slices/userSlice";
import orderReducer from "./slices/orderSlice";

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "cart",
  storage,
};

const persistedCartReducer = persistReducer(persistConfig, cartReducer);

const store = configureStore({
  reducer: {
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: persistedCartReducer,
    user: userReducer,
    order: orderReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export default store;
