import React, { useEffect } from "react";
import Product from "../components/Product";
import MessageBox from "../components/MessageBox";
import LoadingBox from "../components/LoadingBox";
import { useSelector, useDispatch } from "react-redux";
import { getProductList, selectProductList } from "../slices/productListSlice";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector(selectProductList);
  const { isLoading, error, products } = productList;
  console.log(productList);
  useEffect(() => {
    dispatch(getProductList());
  }, [dispatch]);
  return (
    <div>
      {isLoading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row center">
          {products.map((item) => (
            <Product key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
