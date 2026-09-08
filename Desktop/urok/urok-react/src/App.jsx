import "./App.css";
import ProductCard from "./ProductCard";

function App() {
  return (
    <div className="page">
      <h1>Товары</h1>

      <ProductCard name="iPhone 17" price={499000} />
      <ProductCard name="Ноутбук Lenovo" price={350000} />
      <ProductCard name="Наушники AirPods" price={90000} />
    </div>
  );
}

export default App;