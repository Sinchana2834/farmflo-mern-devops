function ProductCard({ name, price }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card shadow h-100">
        <img
          src="https://via.placeholder.com/300x200"
          className="card-img-top"
          alt={name}
        />

        <div className="card-body">
          <h5>{name}</h5>

          <h4 className="text-success">₹{price}</h4>

          <button className="btn btn-success w-100">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;