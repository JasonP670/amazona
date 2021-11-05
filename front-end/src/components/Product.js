import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

export default function Product({ item }) {
  return (
    <div className="card">
      <Link to={`product/${item.id}`}>
        <img className="medium" src={item.image} alt={item.name} />
      </Link>
      <div className="card-body">
        <Link to={`product/${item.id}`}>
          <h2>{item.name}</h2>
        </Link>
        <Rating rating={item.rating} numReviews={item.numReviews} />
        <div className="price">${item.price}</div>
      </div>
    </div>
  );
}
