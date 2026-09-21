import ProductCard from "./ProductCard";
import "./App.css";

function App() {
  return (
    <div className="app">
      <h1> Товары</h1>

      <div className="products">
        <ProductCard name="Ноутбук Lenovo" price={350000} />

        <ProductCard name="Наушники Airpods" price={45000} />

        <ProductCard name="Клавиатура AULA" price={25000} />
      </div>
    </div>
  );
}

export default App;