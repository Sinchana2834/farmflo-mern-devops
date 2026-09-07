import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCartItems(JSON.parse(localStorage.getItem("cart") || "[]"));
  }, []);

  const saveCart = (items) => {
    setCartItems(items);
    localStorage.setItem("cart", JSON.stringify(items));
  };

  const increaseQty = (productId) => {
    const updated = cartItems.map((item) =>
      item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    saveCart(updated);
  };

  const decreaseQty = (productId) => {
    const updated = cartItems.map((item) =>
      item.productId === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    saveCart(updated);
  };

  const removeItem = (productId) => {
    const updated = cartItems.filter((item) => item.productId !== productId);
    saveCart(updated);
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mt-4">
      <h2 className="text-primary mb-4">🛒 Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <div className="alert alert-warning">
          Your cart is empty.
        </div>
      ) : (
        <>
          <table className="table table-bordered table-hover shadow">
            <thead className="table-primary">
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {cartItems.map((item) => (
                <tr key={item.productId}>
                  <td>{item.name}</td>

                  <td>₹{item.price}</td>

                  <td>
                    <button
                      className="btn btn-danger btn-sm me-2"
                      onClick={() => decreaseQty(item.productId)}
                    >
                      -
                    </button>

                    {item.quantity}

                    <button
                      className="btn btn-success btn-sm ms-2"
                      onClick={() => increaseQty(item.productId)}
                    >
                      +
                    </button>
                  </td>

                  <td>₹{item.price * item.quantity}</td>

                  <td>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => removeItem(item.productId)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="card shadow p-3">
            <h4>Total Amount: ₹{total}</h4>

            <button className="btn btn-success mt-3" onClick={() => navigate("/consumer/checkout") }>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;