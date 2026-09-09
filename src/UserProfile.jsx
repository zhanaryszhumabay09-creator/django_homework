import { useState } from "react";

function UserProfile() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  const userName = "Жанарыс";

  function login() {
    setIsLoggedIn(true);
  }

  function logout() {
    setIsLoggedIn(false);
  }

  function deleteAccount() {
    setIsDeleting(false);
    setIsLoggedIn(false);
  }

  if (!isLoggedIn) {
    return (
      <div className="user-profile">
        <h2>Вы не авторизованы</h2>

        <button onClick={login}>Войти</button>
      </div>
    );
  }

  return (
    <div className="user-profile">
      <h2>{isLoggedIn ? "Добро пожаловать!" : "Вы не авторизованы"}</h2>

      <p>Имя: {userName}</p>

      <button onClick={logout}>Выйти</button>

      {isAdmin && <p>Панель администратора</p>}

      {!isAdmin && <p>Вы обычный пользователь</p>}

      <button onClick={() => setIsDeleting(true)}>
        Удалить аккаунт
      </button>

      {isDeleting && (
        <div className="confirmation">
          <p>Вы уверены, что хотите удалить аккаунт?</p>

          <button onClick={deleteAccount}>
            Да, удалить
          </button>

          <button onClick={() => setIsDeleting(false)}>
            Отмена
          </button>
        </div>
      )}
    </div>
  );
}

export default UserProfile;