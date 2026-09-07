import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchProducts } from "../services/productService";
import { fetchConsumerOrders } from "../services/orderService";

function ConsumerDashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/login");
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const productResponse = await fetchProducts();
        setProducts(productResponse.products || []);
        if (user?._id) {
          const orderResponse = await fetchConsumerOrders(user._id);
          setOrders(orderResponse.orders || []);
        }
        const items = JSON.parse(localStorage.getItem("cart") || "[]");
        setCartCount(items.reduce((total, item) => total + item.quantity, 0));
      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, [user?._id]);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12 p-4">

          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3 mb-3">
            <h2 className="mb-0">🛒 Consumer Dashboard</h2>
            <button className="btn btn-outline-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>

          <div className="row mt-4">

            <div className="col-md-4">
              <div className="card shadow text-center p-3">
                <h5>Available Products</h5>
                <h2 className="text-success">{products.length}</h2>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow text-center p-3">
                <h5>My Orders</h5>
                <h2 className="text-primary">{orders.length}</h2>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow text-center p-3">
                <h5>Cart Items</h5>
                <h2 className="text-warning">{cartCount}</h2>
              </div>
            </div>

          </div>

          <div className="mt-5">
            <h4>Recent Orders</h4>

            <table className="table table-bordered table-striped">
              <thead className="table-primary">
                <tr>
                  <th>Order ID</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {orders.slice(0, 5).map((order) => (
                  <tr key={order._id}>
                    <td>{order._id.slice(-6)}</td>
                    <td>{order.product?.name || "Product"}</td>
                    <td>{order.quantity} kg</td>
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
        </div>
      </div>
    </div>
  );
}

export default ConsumerDashboard;