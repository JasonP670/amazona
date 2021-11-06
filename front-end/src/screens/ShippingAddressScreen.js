import React from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  saveShippingAddress,
  selectShippingAddress,
  selectShoppingAddress,
} from "../slices/cartSlice";
import { selectUserData } from "../slices/userSlice";

export default function ShippingAddressScreen(props) {
  const userInfo = useSelector(selectUserData);
  if (!userInfo) {
    props.history.push("/signin");
  }

  const shippingAddresss = useSelector(selectShippingAddress);
  const [fullName, setFullName] = useState(shippingAddresss.fullName);
  const [address, setAddress] = useState(shippingAddresss.address);
  const [city, setCity] = useState(shippingAddresss.city);
  const [postalCode, setPostalCode] = useState(shippingAddresss.postalCode);
  const [country, setCountry] = useState(shippingAddresss.country);

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    // TODO dispatch save shipping address
    localStorage.setItem(
      "shippingAddress",
      JSON.stringify({ fullName, address, city, postalCode, country })
    );
    dispatch(
      saveShippingAddress({ fullName, address, city, postalCode, country })
    );
    props.history.push("/payment");
  };
  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Shipping Address</h1>
        </div>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            placeholder="Enter Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="postalCode">Postal Code</label>
          <input
            type="text"
            id="postalCode"
            placeholder="Enter Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            placeholder="Enter Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label></label>
          <button className="primary" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
