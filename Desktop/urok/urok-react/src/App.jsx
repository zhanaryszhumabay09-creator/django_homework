import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/users/")
      .then((response) => {
        setUsers(response.data);

        if (response.data.length > 0) {
          setUserId(response.data[0].id);
        }
      })
      .catch((error) => {
        console.error("Ошибка:", error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://127.0.0.1:8000/api/notes/", {
        user_id: Number(userId),
        text: text,
      })
      .then((response) => {
        const selectedUser = users.find(
          (user) => user.id === Number(userId)
        );

        setMessage(
          ` ${response.data.message} для ${selectedUser.username}`
        );

        setText("");
      })
      .catch((error) => {
        console.error("Ошибка:", error);
        setMessage(" Ошибка при создании заметки");
      });
  };

  return (
    <div className="app">
      <div className="card">
        <h1> Аккаунты и заметки</h1>

        <form onSubmit={handleSubmit}>
          <label>Пользователь:</label>

          <select
            value={userId}
            onChange={(event) => setUserId(event.target.value)}
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>

          <label>Заметка:</label>

          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Не забыть сделать домашку"
          />

          <button type="submit">
            Отправить
          </button>
        </form>

        {message && <div className="message">{message}</div>}
      </div>
    </div>
  );
}

export default App;