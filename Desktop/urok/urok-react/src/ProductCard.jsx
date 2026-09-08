import { useState } from "react";

function ProductCard({ name, price }) {
  const [count, setCount] = useState(0);

  return (
    <div className="product-card">
      <h2>{name}</h2>
      <p>Цена: {price} ₸</p>

      <button onClick={() => setCount(count - 1)}>-</button>

      <span> Количество: {count} </span>

      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}

export default ProductCard;