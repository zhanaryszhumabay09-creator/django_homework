import "./App.css";

function App() {
  return (
    <div className="app">
      <div className="product-card">
        <img
          className="product-image"
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80"
          alt="Кроссовки"
        />

        <div className="product-info">
          <h1 className="product-title">Nike Air Max</h1>

          <p className="product-description">
            Стильные и удобные кроссовки для повседневной носки
            и активного образа жизни.
          </p>

          <p className="product-price">49 990 ₸</p>

          <button className="buy-button">Купить</button>
        </div>
      </div>
    </div>
  );
}

export default App;