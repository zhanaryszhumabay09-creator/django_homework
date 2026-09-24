// AI-GENERATED: Qoder
import { Link, NavLink } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function Header() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const count = cart?.items_count ?? 0;

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo">
          ZhoraStore
        </Link>

        <nav className="nav">
          <NavLink to="/">Каталог</NavLink>

          {user && <NavLink to="/orders">Мои заказы</NavLink>}

          <NavLink to="/cart">
            Корзина
            {count > 0 && <span className="cart-badge">{count}</span>}
          </NavLink>

          {user ? (
            <>
              <NavLink to="/profile">{user.username}</NavLink>
              <a href="#" onClick={(e) => { e.preventDefault(); logout(); }}>
                Выйти
              </a>
            </>
          ) : (
            <>
              <NavLink to="/login">Войти</NavLink>
              <NavLink to="/register">Регистрация</NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
