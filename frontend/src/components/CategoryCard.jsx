function CategoryCard({ title, emoji }) {
  return (
    <div className="col-md-3 mb-4">
      <div className="card shadow-sm text-center p-4 h-100">
        <h1>{emoji}</h1>
        <h5>{title}</h5>
      </div>
    </div>
  );
}

export default CategoryCard;