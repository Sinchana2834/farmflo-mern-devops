import { useEffect, useState } from "react";
import { fetchProducts } from "../../services/productService";

function Inventory() {
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

  const updateStock = (id, value) => {
    setProducts(
      products.map((product) =>
        product._id === id ? { ...product, quantity: Number(value) } : product
      )
    );
  };

  return (
    <div className="container mt-4">
      <h2 className="text-success mb-4">📦 Inventory Management</h2>

      {loading ? <div className="alert alert-info">Loading inventory...</div> : (
      <table className="table table-bordered table-hover shadow">
        <thead className="table-success">
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Category</th>
            <th>Available Stock</th>
            <th>Unit</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product._id.slice(-6)}</td>
              <td>{product.name}</td>
              <td>{product.category}</td>

              <td>
                <input
                  type="number"
                  className="form-control"
                  value={product.quantity}
                  onChange={(e) =>
                    updateStock(product._id, e.target.value)
                  }
                />
              </td>

              <td>kg</td>

              <td>
                {product.quantity > 50 ? (
                  <span className="badge bg-success">
                    In Stock
                  </span>
                ) : product.quantity > 0 ? (
                  <span className="badge bg-warning text-dark">
                    Low Stock
                  </span>
                ) : (
                  <span className="badge bg-danger">
                    Out of Stock
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )}

      <div className="mt-4">
        <h5>Inventory Summary</h5>

        <div className="row">
          <div className="col-md-4">
            <div className="card text-center shadow p-3">
              <h6>Total Products</h6>
              <h3>{products.length}</h3>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card text-center shadow p-3">
              <h6>Low Stock Items</h6>
              <h3>
                {products.filter(
                  (product) =>
                    product.quantity > 0 && product.quantity <= 50
                ).length}
              </h3>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card text-center shadow p-3">
              <h6>Out of Stock</h6>
              <h3>
                {products.filter(
                  (product) => product.quantity === 0
                ).length}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inventory;