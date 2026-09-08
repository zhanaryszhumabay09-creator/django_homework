import "./App.css";
import ProductCard from "./ProductCard";

function App() {
  return (
    <div className="page">
      <h1>Товары</h1>

      <ProductCard
        name="iPhone 17"
        price={499000}
        category="Смартфоны"
      />

      <ProductCard
        name="Lenovo Legion"
        price={650000}
        category="Ноутбуки"
      />

      <ProductCard
        name="AirPods Pro"
        price={120000}
        category="Наушники"
      />
    </div>
  );
}

export default App;