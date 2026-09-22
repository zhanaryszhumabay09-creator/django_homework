import { useState } from "react";

function ProductCard() {
  const [name, setName] = useState("");
  const [count, setCount] = useState(1);

  const productName = "Ноутбук";
  const price = 450000;

  const addToCart = () => {
    console.log("Имя покупателя:", name);
    console.log("Название товара:", productName);
    console.log("Количество:", count);
  };

  const clear = () => {
    setName("");
    setCount(1);
  };

  const increase = () => {
    setCount(count + 1);
  };

  const decrease = () => {
    setCount(count - 1);
  };

  const showProductName = () => {
    console.log(productName);
  };

  return (
    <div className="product-card">
      <h2 onClick={showProductName}>{productName}</h2>

      <p>Цена: {price} ₸</p>

      <input
        type="text"
        placeholder="Имя покупателя"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <div className="quantity">
        <button onClick={decrease}>−</button>

        <span>{count}</span>

        <button onClick={increase}>+</button>
      </div>

      <button onClick={addToCart}>
        Добавить в корзину
      </button>

      <button onClick={clear}>
        Очистить
      </button>
    </div>
  );
}

export default ProductCard;