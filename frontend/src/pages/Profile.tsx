// AI-GENERATED: Qoder
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <main className="container">
      <div className="form-card">
        <h1>Личный кабинет</h1>

        <div className="field">
          <label>Имя пользователя</label>
          <div>{user.username}</div>
        </div>

        <div className="field">
          <label>Имя и фамилия</label>
          <div>{user.full_name || "—"}</div>
        </div>

        <div className="field">
          <label>Email</label>
          <div>{user.email || "—"}</div>
        </div>

        <Link to="/orders" className="btn">
          Мои заказы
        </Link>
      </div>
    </main>
  );
}

export default Profile;
