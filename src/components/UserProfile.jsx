import { useState } from "react";

function UserProfile() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const userName = "Жанарыс";

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  const deleteAccount = () => {
    console.log("Аккаунт удалён");
    setIsLoggedIn(false);
    setShowDelete(false);
  };

  // Используем if
  if (!isLoggedIn) {
    return (
      <div className="user-profile">
        <h2>Профиль пользователя</h2>

        <p>Вы не авторизованы</p>

        <button onClick={login}>Войти</button>
      </div>
    );
  }

  return (
    <div className="user-profile">
      <h2>Профиль пользователя</h2>

      <p>Добро пожаловать!</p>

      <h3>{userName}</h3>

      {/* Используем ? : */}
      <p>
        {isAdmin
          ? "Панель администратора"
          : "Вы обычный пользователь"}
      </p>

      {/* Переключение администратора */}
      <button onClick={() => setIsAdmin(!isAdmin)}>
        {isAdmin ? "Сделать обычным" : "Сделать администратором"}
      </button>

      <br />

      <button onClick={logout}>Выйти</button>

      <button onClick={() => setShowDelete(true)}>
        Удалить аккаунт
      </button>

      {/* Используем && */}
      {showDelete && (
        <div className="delete-confirm">
          <p>Вы уверены, что хотите удалить аккаунт?</p>

          <button onClick={deleteAccount}>
            Да, удалить
          </button>

          <button onClick={() => setShowDelete(false)}>
            Отмена
          </button>
        </div>
      )}
    </div>
  );
}

export default UserProfile;