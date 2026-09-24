// AI-GENERATED: Qoder
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSending(true);
    try {
      await login(username, password);
      navigate("/");
    } catch {
      setError("Неверный логин или пароль.");
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="container">
      <div className="form-card">
        <h1>Вход</h1>

        {error && <div className="form-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Имя пользователя</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>

          <div className="field">
            <label>Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="btn" type="submit" disabled={sending}>
            {sending ? "Вход..." : "Войти"}
          </button>
        </form>

        <p className="form-link">
          Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
        </p>
      </div>
    </main>
  );
}

export default Login;
