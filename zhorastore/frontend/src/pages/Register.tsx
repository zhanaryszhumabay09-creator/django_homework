// AI-GENERATED: Qoder
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password2: "",
  });
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((c) => ({ ...c, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSending(true);
    try {
      await register(form);
      navigate("/");
    } catch (err: any) {
      const data = err?.response?.data;
      const first = data && Object.values(data)[0];
      setError(Array.isArray(first) ? String(first[0]) : "Ошибка регистрации.");
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="container">
      <div className="form-card">
        <h1>Регистрация</h1>

        {error && <div className="form-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Имя пользователя</label>
            <input name="username" value={form.username} onChange={handleChange} />
          </div>

          <div className="field">
            <label>Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} />
          </div>

          <div className="field">
            <label>Имя</label>
            <input name="first_name" value={form.first_name} onChange={handleChange} />
          </div>

          <div className="field">
            <label>Фамилия</label>
            <input name="last_name" value={form.last_name} onChange={handleChange} />
          </div>

          <div className="field">
            <label>Пароль</label>
            <input name="password" type="password" value={form.password} onChange={handleChange} />
          </div>

          <div className="field">
            <label>Повторите пароль</label>
            <input name="password2" type="password" value={form.password2} onChange={handleChange} />
          </div>

          <button className="btn" type="submit" disabled={sending}>
            {sending ? "Создание..." : "Зарегистрироваться"}
          </button>
        </form>

        <p className="form-link">
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </p>
      </div>
    </main>
  );
}

export default Register;
