import React, { useEffect } from "react";
import {
  listOrderMine,
  selectMyOrderList,
  selectOrderState,
} from "../slices/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function OrderHistoryScreen(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);
  const orderMineList = useSelector(selectMyOrderList);
  console.log(orderMineList);
  const { loading, error, orders } = useSelector(selectOrderState);

  if (loading) {
    return (
      <div>
        <h1>Order History</h1>
        <LoadingBox></LoadingBox>
      </div>
    );
  } else if (error) {
    return (
      <div>
        <h1>Order History</h1>
        <MessageBox variant="danger">{error}</MessageBox>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Order History</h1>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.total_price}</td>
                <td>{order.is_paid ? order.paid_at.substring(0, 10) : "No"}</td>
                <td>
                  {order.is_delivered
                    ? order.delivered_at.substring(0, 10)
                    : "No"}
                </td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() => props.history.push(`/order/${order.id}`)}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
