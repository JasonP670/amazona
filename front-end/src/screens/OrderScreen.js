import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectShippingAddress } from "../slices/cartSlice";
import { selectOrderState, detailsOrder } from "../slices/orderSlice";
import { Link } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";

export default function OrderScreen(props) {
  const orderId = props.match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const shippingAddress = useSelector(selectShippingAddress);
  const { errorMessage, error, loading, order } = useSelector(selectOrderState);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsOrder(orderId));
  }, [dispatch, orderId]);

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await Axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "https://www.paypal.com/sdk/js?client-id=" + data;
      script.async = true;
      script.onLoad = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order) {
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.is_paid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, orderId, order, sdkReady]);

  const successPaymentHandler = () => {
    // dispatch pay order
  };

  if (loading) {
    return <LoadingBox></LoadingBox>;
  }

  if (error) {
    return <MessageBox variant="danger">{errorMessage}</MessageBox>;
  }

  return (
    <div>
      <h1>Order {order.id} </h1>
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
                {order.is_delivered ? (
                  <MessageBox variant="success">
                    Delivered at {order.delivered_at}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Delivered</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method: </strong>
                  {order.payment_method}
                </p>
                {order.is_paid ? (
                  <MessageBox variant="success">
                    Paid at {order.paid_at}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Paid</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Order Item</h2>
                <ul>
                  {Object.keys(order).length !== 0 &&
                    order.Products.map((item, index) => (
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
                            {item.ProductOrder.quantity} x ${item.price} = $
                            {item.ProductOrder.quantity * item.price}
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
                  <div>${order.items_price}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>${order.shipping_price}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>${order.tax_price}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong>Order Total</strong>
                  </div>
                  <div>
                    <strong>${order.total_price}</strong>
                  </div>
                </div>
              </li>
              {!order.is_paid && (
                <li>
                  {!sdkReady ? (
                    <LoadingBox></LoadingBox>
                  ) : (
                    <PayPalButton
                      amount={order.total_price}
                      onSuccess={successPaymentHandler}
                    ></PayPalButton>
                  )}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
