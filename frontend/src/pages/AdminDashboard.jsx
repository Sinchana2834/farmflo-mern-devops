import { useEffect, useState } from "react";
import { fetchUsers, fetchProducts, fetchOrders } from "../services/adminService";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadAdminData = async () => {
      try {
        const usersResponse = await fetchUsers();
        const productsResponse = await fetchProducts();
        const ordersResponse = await fetchOrders();

        setUsers(usersResponse.users || []);
        setProducts(productsResponse.products || []);
        setOrders(ordersResponse.orders || []);
      } catch (error) {
        console.error(error);
      }
    };

    loadAdminData();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Admin Dashboard</h1>

      <div className="row gy-4">
        <div className="col-md-4">
          <div className="card shadow-sm p-4">
            <h5>Users</h5>
            <p className="display-6 mb-0">{users.length}</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm p-4">
            <h5>Products</h5>
            <p className="display-6 mb-0">{products.length}</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm p-4">
            <h5>Orders</h5>
            <p className="display-6 mb-0">{orders.length}</p>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h4>Latest Orders</h4>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead className="table-success">
              <tr>
                <th>Order ID</th>
                <th>Product</th>
                <th>Farmer</th>
                <th>Consumer</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 8).map((order) => (
                <tr key={order._id}>
                  <td>{order._id.slice(-6)}</td>
                  <td>{order.product?.name}</td>
                  <td>{order.farmer?.name}</td>
                  <td>{order.consumer?.name}</td>
                  <td>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;