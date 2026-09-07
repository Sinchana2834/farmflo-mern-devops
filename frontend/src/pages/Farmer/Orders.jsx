import { useEffect, useState } from "react";
import { fetchFarmerOrders, updateOrderStatus } from "../../services/orderService";

function Orders() {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    const loadOrders = async () => {
      if (!user?._id) return;
      try {
        const response = await fetchFarmerOrders(user._id);
        setOrders(response.orders || []);
      } catch (error) {
        console.error(error);
      }
    };

    loadOrders();
  }, [user?._id]);

  const updateStatus = async (id, status) => {
    try {
      const response = await updateOrderStatus(id, status);
      setOrders((prev) => prev.map((order) => (order._id === id ? { ...order, status: response.order.status } : order)));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-success mb-4">📋 Customer Orders</h2>

      <table className="table table-bordered table-hover shadow">
        <thead className="table-success">
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
            <th>Address</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id.slice(-6)}</td>
              <td>{order.consumer?.name}</td>
              <td>{order.product?.name}</td>
              <td>{order.quantity} kg</td>
              <td>₹{order.product?.price}</td>
              <td>₹{order.totalPrice}</td>
              <td>{order.address || "N/A"}</td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>

              <td>
                <select
                  className="form-select"
                  value={order.status}
                  onChange={(e) =>
                    updateStatus(order._id, e.target.value)
                  }
                >
                  <option>Pending</option>
                  <option>Packed</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                  <option>Cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;