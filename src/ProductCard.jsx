import { useState } from "react";

function ProductCard({ name, price }) {
  const [count, setCount] = useState(0);

  const increase = () => {
    setCount(count + 1);
  };

  const decrease = () => {
    if (count > 0) {
      setCount(count - 1);
    }
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
    </div>
  );
}

export default ProductCard;