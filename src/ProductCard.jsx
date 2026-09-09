import { useState } from "react";

function ProductCard() {
  const [name, setName] = useState("");
  const [count, setCount] = useState(1);

  const productName = "iPhone 17";
  const price = 499000;

  function addToCart() {
    console.log("Имя покупателя:", name);
    console.log("Название товара:", productName);
    console.log("Количество:", count);
  }

  function clear() {
    setName("");
    setCount(1);
  }

  return (
    <div className="product-card">
      <h2 onClick={() => console.log(productName)}>
        {productName}
      </h2>

      <p>Цена: {price} ₸</p>

      <input
        type="text"
        placeholder="Введите имя покупателя"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <div>
        <button onClick={() => setCount(count - 1)}>-</button>

        <span> Количество: {count} </span>

        <button onClick={() => setCount(count + 1)}>+</button>
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