import { useState } from "react";

function ProductCard({ name, price, category }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="product-card">
      <h2>{name}</h2>
      <p>Цена: {price} ₸</p>

      <div>
        <button onClick={() => setCount(count - 1)}>-</button>

        <span> Количество: {count} </span>

        <button onClick={() => setCount(count + 1)}>+</button>
      </div>

      <button
        onClick={() => setIsVisible(!isVisible)}
      >
        {isVisible ? "Скрыть информацию" : "Показать информацию"}
      </button>

      {isVisible && <p>Категория: {category}</p>}
    </div>
  );
}

export default ProductCard;