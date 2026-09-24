// AI-GENERATED: Qoder
import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/format";

function Cart() {
  const { cart, loading, updateItem, removeItem } = useCart();

  if (loading) return <div className="status">Загрузка корзины...</div>;

  if (!cart || cart.items.length === 0) {
    return (
      <main className="container">
        <div className="empty">
          <h2>Корзина пуста</h2>
          <p>Добавьте товары из каталога.</p>
          <Link to="/" className="btn">
            Перейти в каталог
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container">
      <div className="section-title">
        <h1>Корзина</h1>
      </div>

      {cart.items.map((item) => (
        <div className="cart-item" key={item.id}>
          <img src={item.product.image} alt={item.product.name} />

          <div className="grow">
            <Link to={`/products/${item.product.id}`}>
              <strong>{item.product.name}</strong>
            </Link>
            <div className="price">{formatPrice(item.product.price)}</div>
          </div>

          <div className="qty-controls">
            <button onClick={() => updateItem(item.id, item.quantity - 1)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => updateItem(item.id, item.quantity + 1)}>+</button>
          </div>

          <div className="price">{formatPrice(item.subtotal)}</div>

          <button className="btn btn-danger" onClick={() => removeItem(item.id)}>
            Удалить
          </button>
        </div>
      ))}

      <div className="cart-summary">
        <div>
          Итого: <strong className="price">{formatPrice(cart.total)}</strong>
        </div>
        <Link to="/checkout" className="btn">
          Оформить заказ
        </Link>
      </div>
    </main>
  );
}

export default Cart;
