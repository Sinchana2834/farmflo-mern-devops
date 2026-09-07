function Hero() {
  return (
    <div className="bg-success text-white py-5">
      <div className="container text-center">
        <h1 className="display-4 fw-bold">
          Fresh Products Directly From Farmers
        </h1>

        <p className="lead mt-3">
          Buy fresh fruits, vegetables, grains, and dairy products without
          middlemen.
        </p>

        <a href="/products" className="btn btn-light btn-lg mt-3">
          Shop Now
        </a>
      </div>
    </div>
  );
}

export default Hero;