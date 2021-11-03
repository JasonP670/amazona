import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";
import data from "../data";
import {
  getProductDetails,
  selectProductDetails,
} from "../slices/productDetailsSlice";

export default function ProductScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const productDetails = useSelector(selectProductDetails);
  const { product, error, isLoading } = productDetails;

  useEffect(() => {
    dispatch(getProductDetails(productId));
  }, [dispatch]);
  console.log(product);
  if (!product) {
    return <div>Product Not Found</div>;
  }
  return (
    <>
      <div>
        {isLoading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">
            The product could not be found
          </MessageBox>
        ) : (
          <div>
            <Link to="/">Back to result</Link>
            <div className="row top">
              <div className="col-2">
                <img className="large" src={product.image} alt={product.name} />
              </div>
              <div className="col-1">
                <ul>
                  <li>
                    <h1>{product.name}</h1>
                  </li>
                  <li>
                    <Rating
                      rating={product.rating}
                      numReviews={product.numReviews}
                    />
                  </li>
                  <li>Price: ${product.price}</li>
                  <li>
                    <p>{product.description}</p>
                  </li>
                </ul>
              </div>
              <div className="col-1">
                <div className="card card-body">
                  <ul>
                    <li>
                      <div className="row">
                        <div>Price</div>
                        <div className="price">${product.price}</div>
                      </div>
                    </li>
                    <li>
                      <div className="row">
                        <div>Status</div>
                        <div>
                          {product.countInStock > 0 ? (
                            <span className="success">In Stock</span>
                          ) : (
                            <span className="danger">Unavailable</span>
                          )}
                        </div>{" "}
                      </div>
                    </li>
                    <li>
                      <button className="primary block">Add to Cart</button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
