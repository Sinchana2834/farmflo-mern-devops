import { useEffect, useState } from "react";
import { fetchConsumerOrders } from "../services/orderService";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    const loadOrders = async () => {
      if (!user?._id) return;
      try {
        const response = await fetchConsumerOrders(user._id);
        setOrders(response.orders || []);
      } catch (error) {
        console.error(error);
      }
    };

    loadOrders();
  }, [user?._id]);

  return (
    <div className="container mt-4">
      <h2 className="text-primary mb-4">📦 My Orders</h2>
      <table className="table table-bordered table-hover shadow">
        <thead className="table-primary">
          <tr>
            <th>Order ID</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id.slice(-6)}</td>
              <td>{order.product?.name}</td>
              <td>{order.quantity} kg</td>
              <td>₹{order.totalPrice}</td>
              <td>
                <span className={`badge ${order.status === "Delivered" ? "bg-success" : order.status === "Cancelled" ? "bg-danger" : "bg-warning"}`}>
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyOrders;
