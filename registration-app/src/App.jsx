import { useState } from "react";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Ручной Promise
  function createUser(name, email) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = {
          id: 1,
          name: name,
          email: email,
        };

        resolve(newUser);
      }, 1000);
    });
  }

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  // Вариант 1 — ручной Promise
  function handlePromiseSubmit(event) {
    event.preventDefault();

    setLoading(true);

    createUser(form.name, form.email)
      .then((result) => {
        console.log("Результат Promise:", result);
        setUser(result);
        setLoading(false);
      });
  }

  // Вариант 2 — настоящий POST через fetch
  function handleFetchSubmit(event) {
    event.preventDefault();

    setLoading(true);

    fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Результат fetch:", result);
        setUser(result);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Ошибка:", error);
        setLoading(false);
      });
  }

  return (
    <div className="app">
      <div className="card">
        <h1>Регистрация пользователя</h1>

        <form onSubmit={handlePromiseSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Введите имя"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Введите email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <button type="submit">
            {loading ? "Отправка..." : "Создать через Promise"}
          </button>

          <button
            type="button"
            onClick={handleFetchSubmit}
            disabled={loading}
          >
            Отправить через fetch POST
          </button>
        </form>

        {user && (
          <div className="result">
            <h2>Полученный пользователь</h2>

            <p>
              <strong>ID:</strong> {user.id}
            </p>

            <p>
              <strong>Имя:</strong> {user.name}
            </p>

            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;