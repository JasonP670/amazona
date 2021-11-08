import React from "react";
import { Link } from "react-router-dom";

export default function CheckoutSteps(props) {
  return (
    <div className="row checkout-steps">
      <div className={props.step1 ? "active" : ""}>Sign In</div>
      <div className={props.step2 ? "active" : ""}>
        {" "}
        <Link to="/shipping" className="checkout">
          Shipping
        </Link>
      </div>
      {props.step3 ? (
        <div className="active">
          <Link to="/payment" className="checkout">
            Payment
          </Link>
        </div>
      ) : (
        <div>Payment</div>
      )}

      <div className={props.step4 ? "active" : ""}>Place Order</div>
    </div>
  );
}
