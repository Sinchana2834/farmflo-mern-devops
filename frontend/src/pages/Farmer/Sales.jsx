import { useEffect, useState } from "react";
import { fetchFarmerOrders } from "../../services/orderService";

function Sales() {
  const [sales, setSales] = useState([]);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    const loadSales = async () => {
      if (!user?._id) return;
      try {
        const response = await fetchFarmerOrders(user._id);
        setSales(response.orders || []);
      } catch (error) {
        console.error(error);
      }
    };

    loadSales();
  }, [user?._id]);

  const totalRevenue = sales.reduce((sum, sale) => sum + sale.totalPrice, 0);
  const totalOrders = sales.length;
  const totalQuantity = sales.reduce((sum, sale) => sum + sale.quantity, 0);
  const today = new Date();
  const todaySales = sales.filter((sale) => new Date(sale.createdAt).toDateString() === today.toDateString()).reduce((sum, sale) => sum + sale.totalPrice, 0);
  const monthSales = sales.filter((sale) => new Date(sale.createdAt).getMonth() === today.getMonth() && new Date(sale.createdAt).getFullYear() === today.getFullYear()).reduce((sum, sale) => sum + sale.totalPrice, 0);
  const productSales = sales.reduce((acc, sale) => {
    const name = sale.product?.name || "Unknown";
    acc[name] = (acc[name] || 0) + sale.quantity;
    return acc;
  }, {});
  const bestSelling = Object.entries(productSales).sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="container mt-4">
      <h2 className="text-success mb-4">
        📊 Sales Report
      </h2>

      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card shadow text-center p-3">
            <h5>Total Revenue</h5>
            <h2 className="text-success">₹{totalRevenue}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow text-center p-3">
            <h5>Today's Sales</h5>
            <h2>₹{todaySales}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow text-center p-3">
            <h5>Monthly Sales</h5>
            <h2>₹{monthSales}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow text-center p-3">
            <h5>Total Orders</h5>
            <h2>{totalOrders}</h2>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card shadow p-3">
            <h5>Total Quantity Sold</h5>
            <h2>{totalQuantity} kg</h2>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow p-3">
            <h5>Best Selling Product</h5>
            <h2>{bestSelling ? `${bestSelling[0]} (${bestSelling[1]} kg)` : "No sales yet"}</h2>
          </div>
        </div>
      </div>

      <table className="table table-bordered table-hover shadow">
        <thead className="table-success">
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Customer</th>
            <th>Quantity</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {sales.map((sale) => (
            <tr key={sale._id}>
              <td>{sale._id.slice(-6)}</td>
              <td>{sale.product?.name}</td>
              <td>{sale.consumer?.name}</td>
              <td>{sale.quantity} kg</td>
              <td>₹{sale.totalPrice}</td>
              <td>{new Date(sale.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Sales;