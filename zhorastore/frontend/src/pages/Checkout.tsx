// AI-GENERATED: Qoder
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/client";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/format";

function Checkout() {
  const { user } = useAuth();
  const { cart, refresh } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: user?.full_name ?? "",
    email: user?.email ?? "",
    phone: "",
    address: "",
    comment: "",
  });
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((c) => ({ ...c, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSending(true);
    try {
      await api.post("/orders/checkout/", form);
      await refresh();
      navigate("/orders");
    } catch (err: any) {
      const data = err?.response?.data;
      const first = data && Object.values(data)[0];
      setError(Array.isArray(first) ? String(first[0]) : "Не удалось оформить заказ.");
    } finally {
      setSending(false);
    }
  };

  if (!cart || cart.items.length === 0) {
    return (
      <main className="container">
        <div className="empty">
          <h2>Корзина пуста</h2>
          <p>Добавьте товары, чтобы оформить заказ.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="container">
      <div className="form-card">
        <h1>Оформление заказа</h1>

        {error && <div className="form-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>ФИО</label>
            <input name="full_name" value={form.full_name} onChange={handleChange} required />
          </div>

          <div className="field">
            <label>Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} required />
          </div>

          <div className="field">
            <label>Телефон</label>
            <input name="phone" value={form.phone} onChange={handleChange} required />
          </div>

          <div className="field">
            <label>Адрес доставки</label>
            <input name="address" value={form.address} onChange={handleChange} required />
          </div>

          <div className="field">
            <label>Комментарий</label>
            <textarea name="comment" value={form.comment} onChange={handleChange} rows={3} />
          </div>

          <p>
            К оплате: <strong className="price">{formatPrice(cart.total)}</strong>
          </p>

          <button className="btn" type="submit" disabled={sending}>
            {sending ? "Оформление..." : "Подтвердить заказ"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default Checkout;
