// AI-GENERATED: Qoder
import { Link } from "react-router-dom";

import type { Product } from "../types";
import { formatPrice } from "../utils/format";

function ProductCard({ product }: { product: Product }) {
  return (
    <Link to={`/products/${product.id}`} className="product-card">
      <img src={product.image} alt={product.name} />
      <div className="product-info">
        <span className="category">{product.category_name}</span>
        <h3>{product.name}</h3>
        <span className="price">{formatPrice(product.price)}</span>
        <span className={`availability ${product.is_available ? "available" : "not-available"}`}>
          {product.is_available ? "В наличии" : "Нет в наличии"}
        </span>
      </div>
    </Link>
  );
}

export default ProductCard;
