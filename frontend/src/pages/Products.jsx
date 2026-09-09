import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../services/productService";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetchProducts();
        setProducts(response.products || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const addToCart = (product) => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = storedCart.find((item) => item.productId === product._id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      storedCart.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
        farmer: product.farmer?._id || product.farmer,
      });
    }

    localStorage.setItem("cart", JSON.stringify(storedCart));
    navigate("/consumer/cart");
  };

  return (
    <div className="container mt-4">
      <h2 className="text-success mb-4">🛍 Browse Products</h2>

      {loading ? (
        <div className="alert alert-info">Loading products...</div>
      ) : (
        <div className="row">
          {products.map((product) => (
            <div className="col-md-3 mb-4" key={product._id}>
              <div className="card shadow h-100">
                <img
                  src={product.image ? `${import.meta.env.VITE_API_URL?.replace(/\/api$/, "") || "http://localhost:8000"}${product.image}` : "https://via.placeholder.com/180x180?text=Farm+Product"}
                  className="card-img-top"
                  alt={product.name}
                  height="180"
                  style={{ objectFit: "cover" }}
                />

                <div className="card-body">
                  <h5>{product.name}</h5>

                  <p>
                    <strong>Category:</strong> {product.category}
                  </p>

                  <p>
                    <strong>Farmer:</strong> {product.farmer?.name || "Unknown"}
                  </p>

                  <p>
                    <strong>Available:</strong> {product.quantity} kg
                  </p>

                  <h5 className="text-success">₹{product.price}/kg</h5>

                  <button
                    className="btn btn-success w-100"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;