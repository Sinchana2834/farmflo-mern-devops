import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchProducts } from "../services/productService";
import { fetchFarmerOrders } from "../services/orderService";

function FarmerDashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
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
        const farmerProducts = (productResponse.products || []).filter((product) => product.farmer?._id === user?._id);
        setProducts(farmerProducts);

        if (user?._id) {
          const orderResponse = await fetchFarmerOrders(user._id);
          setOrders(orderResponse.orders || []);
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, [user?._id]);

  const pendingOrders = orders.filter((order) => order.status === "Pending").length;
  const completedOrders = orders.filter((order) => order.status === "Delivered").length;
  const revenue = orders.reduce((sum, order) => sum + (order.status === "Delivered" ? order.totalPrice : 0), 0);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12 p-4">

          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3 mb-3">
            <h2 className="mb-0">👨‍🌾 Farmer Dashboard</h2>
            <button className="btn btn-outline-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>

          <div className="row mt-4">

            <div className="col-md-3">
              <div className="card shadow text-center p-3">
                <h5>Total Products</h5>
                <h2 className="text-success">{products.length}</h2>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow text-center p-3">
                <h5>Pending Orders</h5>
                <h2 className="text-warning">{pendingOrders}</h2>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow text-center p-3">
                <h5>Completed Orders</h5>
                <h2 className="text-primary">{completedOrders}</h2>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow text-center p-3">
                <h5>Total Revenue</h5>
                <h2 className="text-danger">₹{revenue}</h2>
              </div>
            </div>

          </div>

          <div className="mt-5">
            <h4>📦 Recent Orders</h4>

            <table className="table table-bordered table-striped mt-3">
              <thead className="table-success">
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {orders.slice(0, 5).map((order) => (
                  <tr key={order._id}>
                    <td>{order._id.slice(-6)}</td>
                    <td>{order.consumer?.name}</td>
                    <td>{order.product?.name}</td>
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

export default FarmerDashboard;