import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [customer, setCustomer] = useState("");
  const [bun, setBun] = useState("");
  const [meat, setMeat] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

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

    
    if (!meat) {
      setError("Сначала выберите мясо!");
      return;
    }

    if (!customer.trim()) {
      setError("Введите имя клиента!");
      return;
    }

    if (!bun) {
      setError("Выберите булочку!");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/orders/",
        {
          customer: customer,
          bun: bun,
          meat: meat,
          ingredients: ingredients,
          quantity: quantity,
        }
      );

      setOrder(response.data);
    } catch (error) {
      console.error(error);
      setError("Ошибка при создании заказа!");
    }
  };

  return (
    <div className="container">
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
          <option value="">Выберите булочку</option>
          <option value="Бриошь">Бриошь</option>
          <option value="Классическая">Классическая</option>
          <option value="Чиабатта">Чиабатта</option>
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

        <div className="quantity">
          <button
            type="button"
            onClick={() =>
              setQuantity(Math.max(1, quantity - 1))
            }
          >
            −
          </button>

          <span>{quantity}</span>

          <button
            type="button"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </button>
        </div>

        <button className="order-button" type="submit">
          Заказать
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
              : "нет"}
          </p>

          <p>
            <strong>Количество:</strong> {order.quantity}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;