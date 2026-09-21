import { useState } from "react";
import "./App.css";

function App() {
  const [customer, setCustomer] = useState("");
  const [bun, setBun] = useState("Бриошь");
  const [meat, setMeat] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  const ingredientList = [
    "Сыр",
    "Бекон",
    "Помидор",
    "Огурец",
    "Салат",
  ];

  const toggleIngredient = (ingredient) => {
    setIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((item) => item !== ingredient)
        : [...prev, ingredient]
    );
  };

  const createOrder = async (e) => {
    e.preventDefault();

    setError("");
    setOrder(null);

    if (!meat) {
      setError("Пожалуйста, выберите мясо");
      return;
    }

    const data = {
      customer,
      bun,
      meat,
      ingredients,
      quantity: Number(quantity),
    };

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/burger-orders/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        setError("Ошибка при создании заказа");
        return;
      }

      setOrder(result);
    } catch (error) {
      setError("Не удалось подключиться к Django");
    }
  };

  return (
    <div className="app">
      <div className="burger-card">
        <h1> Конструктор бургера</h1>

        <form onSubmit={createOrder}>
          <label>Имя клиента</label>
          <input
            type="text"
            placeholder="Введите имя"
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            required
          />

          <label>Булочка</label>
          <select value={bun} onChange={(e) => setBun(e.target.value)}>
            <option value="Бриошь">Бриошь</option>
            <option value="Классическая">Классическая</option>
            <option value="Чёрная">Чёрная</option>
            <option value="Кунжутная">Кунжутная</option>
          </select>

          <label>Мясо</label>
          <select value={meat} onChange={(e) => setMeat(e.target.value)}>
            <option value="">Выберите мясо</option>
            <option value="Говядина">Говядина</option>
            <option value="Курица">Курица</option>
            <option value="Свинина">Свинина</option>
          </select>

          <label>Дополнительные ингредиенты</label>

          <div className="ingredients">
            {ingredientList.map((ingredient) => (
              <label key={ingredient} className="checkbox">
                <input
                  type="checkbox"
                  checked={ingredients.includes(ingredient)}
                  onChange={() => toggleIngredient(ingredient)}
                />
                {ingredient}
              </label>
            ))}
          </div>

          <label>Количество</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          <button type="submit">Заказать </button>
        </form>

        {error && <div className="error"> {error}</div>}

        {order && (
          <div className="success">
            <h2> Заказ создан!</h2>

            <p>
              <strong>Бургер:</strong> {order.bun} + {order.meat}
            </p>

            <p>
              <strong>Добавки:</strong>{" "}
              {order.ingredients.length > 0
                ? order.ingredients.join(", ")
                : "Нет"}
            </p>

            <p>
              <strong>Количество:</strong> {order.quantity}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;