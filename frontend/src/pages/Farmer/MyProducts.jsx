import { useEffect, useState } from "react";
import { fetchProducts } from "../../services/productService";

function MyProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetchProducts();
        const farmerProducts = (response.products || []).filter((product) => product.farmer?._id === JSON.parse(localStorage.getItem("user") || "{}")?._id);
        setProducts(farmerProducts);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-success mb-4">📦 My Products</h2>

      {loading ? <div className="alert alert-info">Loading products...</div> : (
        <table className="table table-bordered table-hover shadow">
          <thead className="table-success">
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>₹{product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.quantity > 0 ? "In Stock" : "Out of Stock"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MyProducts;