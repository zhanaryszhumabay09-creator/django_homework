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
  const [loading, setLoading] = useState(false);

  const availableIngredients = [
    "Сыр",
    "Бекон",
    "Помидор",
    "Салат",
    "Лук",
  ];

  const handleIngredientChange = (ingredient) => {
    if (ingredients.includes(ingredient)) {
      setIngredients(
        ingredients.filter((item) => item !== ingredient)
      );
    } else {
      setIngredients([...ingredients, ingredient]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setOrder(null);

    // Главное дополнительное условие
    if (!meat) {
      setError(" Сначала выберите мясо!");
      return;
    }

    if (!customer.trim()) {
      setError(" Введите имя клиента!");
      return;
    }

    const burgerData = {
      customer: customer,
      bun: bun,
      meat: meat,
      ingredients: ingredients,
      quantity: quantity,
    };

    try {
      setLoading(true);

      const response = await fetch(
        "http://127.0.0.1:8000/api/orders/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(burgerData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Ошибка при создании заказа");
      }

      setOrder(data);

      // Очищаем форму
      setCustomer("");
      setMeat("");
      setIngredients([]);
      setQuantity(1);
    } catch (error) {
      setError(" Не удалось отправить заказ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="burger-container">
        <h1> Конструктор бургера</h1>

        <form onSubmit={handleSubmit}>
          <label>Имя клиента</label>

          <input
            type="text"
            placeholder="Например: Мага"
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
          />

          <label>Булочка</label>

          <select
            value={bun}
            onChange={(e) => setBun(e.target.value)}
          >
            <option value="Бриошь">Бриошь</option>
            <option value="Классическая">Классическая</option>
            <option value="Чёрная">Чёрная</option>
          </select>

          <label>Мясо</label>

          <select
            value={meat}
            onChange={(e) => setMeat(e.target.value)}
          >
            <option value="">Выберите мясо</option>
            <option value="Говядина">Говядина</option>
            <option value="Курица">Курица</option>
            <option value="Свинина">Свинина</option>
          </select>

          <label>Дополнительные ингредиенты</label>

          <div className="ingredients">
            {availableIngredients.map((ingredient) => (
              <label
                className="ingredient"
                key={ingredient}
              >
                <input
                  type="checkbox"
                  checked={ingredients.includes(ingredient)}
                  onChange={() =>
                    handleIngredientChange(ingredient)
                  }
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
            onChange={(e) =>
              setQuantity(Number(e.target.value))
            }
          />

          <button type="submit" disabled={loading}>
            {loading ? "Отправка..." : " Заказать"}
          </button>
        </form>

        {error && (
          <div className="error">
            {error}
          </div>
        )}

        {order && (
          <div className="success">
            <h2> Заказ создан!</h2>

            <p>
              <strong>Бургер:</strong>{" "}
              {order.bun} + {order.meat}
            </p>

            <p>
              <strong>Добавки:</strong>{" "}
              {order.ingredients.length > 0
                ? order.ingredients.join(", ")
                : "Нет"}
            </p>

            <p>
              <strong>Количество:</strong>{" "}
              {order.quantity}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;