import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Watch from "./pages/Watch.jsx";
import Register from "./pages/Register.jsx";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);

  // Cargar el catálogo local al iniciar
  useEffect(() => {
    fetch("/movies.json")
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => console.error("No se pudo cargar movies.json", err))
      .finally(() => setLoading(false));
  }, []);

  // Recuperar la sesión guardada
  useEffect(() => {
    const saved = localStorage.getItem("classicflix_user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const login = (data) => {
    setUser(data);
    localStorage.setItem("classicflix_user", JSON.stringify(data));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("classicflix_user");
  };

  return (
    <>
      <Navbar search={search} setSearch={setSearch} user={user} onLogout={logout} />
      <main>
        <Routes>
          <Route path="/" element={<Home movies={movies} loading={loading} search={search} />} />
          <Route path="/watch/:id" element={<Watch movies={movies} loading={loading} user={user} />} />
          <Route path="/registro" element={<Register onRegister={login} />} />
          <Route path="*" element={<p className="empty">Esta página no existe.</p>} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
