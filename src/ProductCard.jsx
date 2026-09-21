import { useState } from "react";

function ProductCard({ name, price, category }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const increase = () => {
    setCount(count + 1);
  };

  const decrease = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const toggleInfo = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="product-card">
      <h2>{name}</h2>

      <p>Цена: {price} ₸</p>

      <div className="counter">
        <button onClick={decrease}>−</button>

        <span>{count}</span>

        <button onClick={increase}>+</button>
      </div>

      <button className="info-button" onClick={toggleInfo}>
        {isVisible ? "Скрыть информацию" : "Показать информацию"}
      </button>

      {isVisible && (
        <p className="category">
          Категория: {category}
        </p>
      )}
    </div>
  );
}

export default ProductCard;