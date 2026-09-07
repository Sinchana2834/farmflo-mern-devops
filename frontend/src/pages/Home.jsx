import Hero from "../components/Hero";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";

function Home() {
  return (
    <>
      <Hero />

      <div className="container my-5">

        <h2 className="text-center mb-4">
          Categories
        </h2>

        <div className="row">
          <CategoryCard title="Vegetables" emoji="🥦" />
          <CategoryCard title="Fruits" emoji="🍎" />
          <CategoryCard title="Grains" emoji="🌾" />
          <CategoryCard title="Dairy" emoji="🥛" />
        </div>

        <h2 className="text-center mt-5 mb-4">
          Featured Products
        </h2>

        <div className="row">
          <ProductCard name="Tomato" price={40} />
          <ProductCard name="Apple" price={120} />
          <ProductCard name="Rice" price={60} />
        </div>

      </div>
    </>
  );
}

export default Home;