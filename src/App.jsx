import { useState } from "react";
import {
  login,
  getProfile,
  logout,
} from "./api";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      await login(username, password);

      const data = await getProfile();

      setProfile(data);
    } catch (error) {
      console.error(error);

      setError("Неверный логин или пароль");
    } finally {
      setLoading(false);
    }
  };


  const handleLogout = () => {
    logout();

    setProfile(null);
    setUsername("");
    setPassword("");
  };


  return (
    <div style={styles.container}>

      <div style={styles.card}>

        <h1>JWT Авторизация</h1>

        {!profile ? (
          <form onSubmit={handleLogin}>

            <input
              type="text"
              placeholder="Логин"
              value={username}
              onChange={(event) =>
                setUsername(event.target.value)
              }
              style={styles.input}
            />

            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              style={styles.input}
            />

            <button
              type="submit"
              style={styles.button}
              disabled={loading}
            >
              {loading ? "Вход..." : "Войти"}
            </button>

            {error && (
              <p style={styles.error}>
                {error}
              </p>
            )}

          </form>
        ) : (

          <div>

            <h2>Вы авторизованы! </h2>

            <p>
              <b>Username:</b> {profile.username}
            </p>

            <p>
              <b>Email:</b> {profile.email}
            </p>

            <p>
              {profile.message}
            </p>

            <button
              onClick={handleLogout}
              style={styles.logout}
            >
              Выйти
            </button>

          </div>

        )}

      </div>

    </div>
  );
}


const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f5f5",
  },

  card: {
    width: "350px",
    padding: "30px",
    background: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    boxSizing: "border-box",
  },

  button: {
    width: "100%",
    padding: "12px",
    cursor: "pointer",
  },

  logout: {
    padding: "10px 20px",
    cursor: "pointer",
  },

  error: {
    color: "red",
  },
};


export default App;