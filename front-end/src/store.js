import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import productListReducer from "./slices/productListSlice";
import productDetailsReducer from "./slices/productDetailsSlice";
import cartReducer from "./slices/cartSlice";
import userReducer from "./slices/userSlice";

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
import userAddressReducer from "./slices/userAddressSlice";

const persistConfig = {
  key: "cart",
  storage,
};

// const userPersistConfig = {
//   key: "user",
//   storage,
//   whitelist: ["token"],
// };

const persistedCartReducer = persistReducer(persistConfig, cartReducer);
// const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

const store = configureStore({
  reducer: {
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: persistedCartReducer,
    user: userReducer,
    // userSignin: userSigninReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export default store;
