import "./App.css";

function App() {
  return (
    <div className="page">
      <div className="product-card">
        <img
          className="product-image"
          src="https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80"
          alt="Смартфон"
        />

        <div className="product-info">
          <h1 className="product-title">iPhone 17</h1>

          <p className="product-description">
            Современный смартфон с отличной камерой,
            быстрым процессором и стильным дизайном.
          </p>

          <p className="product-price">499 000 ₸</p>

          <button className="buy-button">Купить</button>
        </div>
      </div>
    </div>
  );
}

export default App;