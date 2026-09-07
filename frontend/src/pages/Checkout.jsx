import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../services/orderService";

function Checkout() {
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    payment: "Cash on Delivery",
  });
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(items);
  }, []);

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      for (const item of cartItems) {
        await createOrder({
          productId: item.productId,
          quantity: item.quantity,
          address: customer.address,
          paymentMethod: customer.payment,
        });
      }

      localStorage.removeItem("cart");
      setCartItems([]);
      setMessage("🎉 Order placed successfully!");
      navigate("/consumer/dashboard");
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h2 className="text-success mb-4">💳 Checkout</h2>

        <form onSubmit={placeOrder}>
          {message && <div className="alert alert-info">{message}</div>}
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={customer.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              name="phone"
              className="form-control"
              value={customer.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Delivery Address</label>
            <textarea
              name="address"
              rows="3"
              className="form-control"
              value={customer.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Payment Method</label>
            <select
              name="payment"
              className="form-select"
              value={customer.payment}
              onChange={handleChange}
            >
              <option>Cash on Delivery</option>
              <option>UPI</option>
              <option>Credit Card</option>
              <option>Debit Card</option>
              <option>Net Banking</option>
            </select>
          </div>

          <div className="alert alert-info">
            <h5>Total Amount: ₹{totalAmount}</h5>
          </div>

          <button type="submit" className="btn btn-success w-100" disabled={loading}>
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;