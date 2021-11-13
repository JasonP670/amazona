import React, { useEffect } from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCart,
  selectShippingAddress,
  clearCart,
} from "../slices/cartSlice";
import { selectOrderLoading, selectOrderState } from "../slices/orderSlice";
import { placeOrder } from "../slices/orderSlice";
import { Link } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function PlaceOrderScreen(props) {
  const shippingAddress = useSelector(selectShippingAddress);
  const cart = useSelector(selectCart);
  const { errorMessage, error, success, order } = useSelector(selectOrderState);
  const loading = useSelector(selectOrderLoading);
  if (!cart.paymentMethod) {
    props.history.push("/payment");
  }

  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    const order = {
      addressId: shippingAddress.id,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice,
      paymentMethod: cart.paymentMethod,
      isPaid: false,
      paidAt: new Date(),
      cart: cart.cart,
    };
    dispatch(placeOrder(order));
  };

  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order.id}`);
      dispatch(clearCart());
    }
  }, [dispatch, success, order, props.history]);

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name: </strong>
                  {shippingAddress.full_name}
                  <br />
                  <strong>Address: </strong>
                  {shippingAddress.address_line1},{" "}
                  {shippingAddress.address_line2}, {shippingAddress.city},{" "}
                  {shippingAddress.postal_code}, {shippingAddress.country}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method: </strong>
                  {cart.paymentMethod}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Order Item</h2>
                <ul>
                  {cart.cart.map((item, index) => (
                    <li key={index}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          />
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>
                        <div>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>${cart.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>${cart.shippingPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>${cart.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong>Order Total</strong>
                  </div>
                  <div>
                    <strong>${cart.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              <li>
                <button
                  type="submit"
                  className="primary block"
                  onClick={placeOrderHandler}
                  disabled={cart.cart.length === 0}
                >
                  Place Order
                </button>
              </li>
              {loading && <LoadingBox variant="small"></LoadingBox>}
              {error && (
                <MessageBox variant="danger">{errorMessage}</MessageBox>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
