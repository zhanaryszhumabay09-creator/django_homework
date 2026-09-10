import { useEffect, useState } from "react";
import "./App.css";

const products = [
  {
    id: 1,
    name: "iPhone 16",
    price: 450000,
    category: "Смартфоны",
    image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500",
  },
  {
    id: 2,
    name: "MacBook Air",
    price: 550000,
    category: "Ноутбуки",
    image: "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?w=500",
  },
  {
    id: 3,
    name: "AirPods Pro",
    price: 120000,
    category: "Наушники",
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=500",
  },
  {
    id: 4,
    name: "Apple Watch",
    price: 180000,
    category: "Часы",
    image: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=500",
  },
  {
    id: 5,
    name: "iPad Air",
    price: 300000,
    category: "Планшеты",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500",
  },
  {
    id: 6,
    name: "Sony Headphones",
    price: 95000,
    category: "Наушники",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
  },
];

function App() {
  const [cart, setCart] = useState([]);

  // 1. При первом запуске
  useEffect(() => {
    console.log("Количество товаров:", products.length);
  }, []);

  // 2. Получаем корзину из localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");

    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // 3. Сохраняем корзину при изменении
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Добавление товара
  function addToCart(product) {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  }

  // Удаление товара
  function removeFromCart(id) {
    setCart((prevCart) =>
      prevCart.filter((item) => item.id !== id)
    );
  }

  // Общее количество
  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Общая стоимость
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="app">
      <header>
        <h1>🛍️ My Store</h1>

        <div className="cart-info">
          🛒 Корзина: {totalItems}
        </div>
      </header>

      <main>
        <section className="products">
          <h2>Товары</h2>

          <div className="product-list">
            {products.map((product) => (
              <div className="product-card" key={product.id}>
                <img
                  src={product.image}
                  alt={product.name}
                />

                <div className="product-info">
                  <h3>{product.name}</h3>

                  <p className="category">
                    {product.category}
                  </p>

                  <p className="price">
                    {product.price.toLocaleString()} ₸
                  </p>

                  <button
                    onClick={() => addToCart(product)}
                  >
                    Добавить в корзину
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="cart">
          <h2>🛒 Корзина</h2>

          {cart.length === 0 ? (
            <p className="empty">
              Корзина пустая
            </p>
          ) : (
            <>
              <div className="cart-items">
                {cart.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <div>
                      <h3>{item.name}</h3>

                      <p>
                        {item.price.toLocaleString()} ₸ ×{" "}
                        {item.quantity}
                      </p>
                    </div>

                    <button
                      className="delete"
                      onClick={() =>
                        removeFromCart(item.id)
                      }
                    >
                      Удалить
                    </button>
                  </div>
                ))}
              </div>

              <div className="total">
                <h3>
                  Товаров: {totalItems}
                </h3>

                <h2>
                  Итого: {totalPrice.toLocaleString()} ₸
                </h2>
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;