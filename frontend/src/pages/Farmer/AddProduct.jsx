import { useState } from "react";
import { createProduct } from "../../services/productService";

function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    description: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setProduct({ ...product, image: files[0] });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("category", product.category);
      formData.append("price", product.price);
      formData.append("quantity", product.quantity);
      formData.append("description", product.description);
      if (product.image) {
        formData.append("image", product.image);
      }

      await createProduct(formData);
      setMessage("Product added successfully!");
      setProduct({ name: "", category: "", price: "", quantity: "", description: "", image: null });
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h2 className="text-success text-center mb-4">
          Add Product
        </h2>

        <form onSubmit={handleSubmit}>
          {message && <div className="alert alert-info">{message}</div>}

          <div className="mb-3">
            <label>Product Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Category</label>
            <select
              className="form-select"
              name="category"
              value={product.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option>Vegetables</option>
              <option>Fruits</option>
              <option>Grains</option>
              <option>Dairy</option>
            </select>
          </div>

          <div className="mb-3">
            <label>Price</label>
            <input
              type="number"
              className="form-control"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Quantity (kg)</label>
            <input
              type="number"
              className="form-control"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Description</label>
            <textarea
              className="form-control"
              rows="4"
              name="description"
              value={product.description}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label>Product Image</label>
            <input
              type="file"
              className="form-control"
              name="image"
              onChange={handleChange}
            />
          </div>

          <button className="btn btn-success w-100" disabled={loading}>
            {loading ? "Saving..." : "Add Product"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddProduct;