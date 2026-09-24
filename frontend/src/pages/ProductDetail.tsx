// AI-GENERATED: Qoder
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../api/client";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import type { Product } from "../types";
import { formatPrice } from "../utils/format";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addItem } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .get<Product>(`/products/${id}/`)
      .then((r) => setProduct(r.data))
      .catch(() => setError("Товар не найден."))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAdd = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (!product) return;
    await addItem(product.id, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) return <div className="status">Загрузка...</div>;
  if (error || !product) return <div className="status">Ошибка: {error}</div>;

  return (
    <main className="container">
      <div className="product-detail">
        <img src={product.image} alt={product.name} />

        <div>
          <span className="category">{product.category_name}</span>
          <h1>{product.name}</h1>
          <p className="price">{formatPrice(product.price)}</p>
          <p
            className={`availability ${product.is_available ? "available" : "not-available"}`}
          >
            {product.is_available ? "В наличии" : "Нет в наличии"}
          </p>

          <p>{product.description}</p>

          <div className="qty-row">
            <label>Количество:</label>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
            />
          </div>

          <button
            className="btn"
            onClick={handleAdd}
            disabled={!product.is_available}
          >
            {added ? "Добавлено в корзину" : "Добавить в корзину"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default ProductDetail;
