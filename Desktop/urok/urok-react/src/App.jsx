import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const findUsers = () => {
    setLoading(true);

    axios
      .get("http://127.0.0.1:8000/api/users/", {
        params: {
          search: search,
        },
      })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Ошибка:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="app">
      <div className="card">
        <h1> Поиск пользователей</h1>

        <div className="search-box">
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Введите username"
          />

          <button onClick={findUsers}>
            Найти
          </button>
        </div>

        {loading && <p className="loading">Загрузка...</p>}

        {!loading && users.length === 0 && (
          <p className="empty">
            Пользователи не найдены 
          </p>
        )}

        <div className="users">
          {users.map((user) => (
            <div className="user" key={user.id}>
              <h2> {user.username}</h2>
              <p> {user.email}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;