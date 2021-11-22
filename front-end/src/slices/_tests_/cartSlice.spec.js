import cartReducer from "../cartSlice";
import { Reducer } from "redux-testkit";

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

describe("cartSlice", () => {
  it("should have initial state", () => {
    expect(cartReducer()).toEqual(initialState);
  });

  it("should not affect state", () => {
    Reducer(cartReducer)
      .expect({ type: "NOT_EXISTING" })
      .toReturnState(initialState);
  });
});
