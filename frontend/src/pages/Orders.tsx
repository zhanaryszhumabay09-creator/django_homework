// AI-GENERATED: Qoder
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../api/client";
import type { Order } from "../types";
import { formatPrice } from "../utils/format";

function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get<Order[]>("/orders/")
      .then((r) => setOrders(r.data))
      .catch(() => setError("Не удалось загрузить заказы."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="status">Загрузка заказов...</div>;
  if (error) return <div className="status">Ошибка: {error}</div>;

  if (orders.length === 0) {
    return (
      <main className="container">
        <div className="empty">
          <h2>Заказов пока нет</h2>
          <p>Оформите первый заказ в каталоге.</p>
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
        <h1>Мои заказы</h1>
      </div>

      {orders.map((order) => (
        <div className="order-card" key={order.id}>
          <div className="order-head">
            <div>
              <strong>Заказ #{order.id}</strong>{" "}
              <span className="status-badge">{order.status_display}</span>
              <div>
                <small>
                  {new Date(order.created_at).toLocaleString("ru-RU")}
                </small>
              </div>
            </div>
            <div className="price">{formatPrice(order.total)}</div>
          </div>

          <ul className="order-items">
            {order.items.map((item) => (
              <li key={item.id}>
                {item.product_name} — {item.quantity} x {formatPrice(item.price)}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </main>
  );
}

export default Orders;
