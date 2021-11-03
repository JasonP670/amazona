// import { applyMiddleware, combineReducers, createStore } from "redux";
// import { compose } from "redux";
// import thunk from "redux-thunk";
// import { productListReducer } from "./reducers/productReducers";
import { configureStore } from "@reduxjs/toolkit";
import productListReducer from "./slices/productListSlice";

// const initialState = {};

// const reducer = combineReducers({
//   productList: productListReducer,
// });
// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(
//   reducer,
//   initialState,
//   composeEnhancer(applyMiddleware(thunk))
// );

// export default store;

const store = configureStore({
  reducer: {
    productList: productListReducer,
  },
});

export default store;
