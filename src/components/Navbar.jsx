import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

export default function Navbar({ search, setSearch, user, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    setSearch(e.target.value);
    // Si estás viendo una película, vuelve al catálogo para mostrar resultados
    if (location.pathname !== "/") navigate("/");
  };

  return (
    <header className="navbar">
      <Link to="/" className="logo" onClick={() => setSearch("")}>
        ClassicFlix
      </Link>

      <nav className="nav-links">
        <NavLink to="/" end>Inicio</NavLink>
        {!user && <NavLink to="/registro">Registrarse</NavLink>}
      </nav>

      <input
        className="search"
        type="search"
        placeholder="Buscar por título o categoría"
        value={search}
        onChange={handleSearch}
        aria-label="Buscar películas"
      />

      {user && (
        <div className="session">
          <span>Hola, {user.nombre}</span>
          <button className="btn-ghost" onClick={onLogout}>Salir</button>
        </div>
      )}
    </header>
  );
}
