import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>My Website</h2>

      <div className="nav-links">
        <NavLink to="/">Главная</NavLink>
        <NavLink to="/about">О нас</NavLink>
        <NavLink to="/contact">Контакты</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;