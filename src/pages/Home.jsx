import { useEffect, useState } from "react";
import HeroBanner from "../components/HeroBanner.jsx";
import MovieRow from "../components/MovieRow.jsx";
import MovieCard from "../components/MovieCard.jsx";
import { getHistory, getRecommended, getTopCategory } from "../utils/history.js";

export default function Home({ movies, loading, search }) {
  const [history, setHistory] = useState([]);

  // Leer el historial guardado al entrar al catálogo
  useEffect(() => {
    setHistory(getHistory());
  }, []);

  if (loading) return <p className="empty">Cargando catálogo…</p>;
  if (movies.length === 0) {
    return <p className="empty">No hay películas. Revisa public/movies.json.</p>;
  }

  // Búsqueda en tiempo real
  const term = search.trim().toLowerCase();
  if (term) {
    const results = movies.filter(
      (m) => m.titulo.toLowerCase().includes(term) || m.categoria.toLowerCase().includes(term)
    );
    return (
      <section className="row">
        <h2>Resultados para “{search}”</h2>
        {results.length === 0 ? (
          <p className="empty">No encontramos películas con ese término.</p>
        ) : (
          <div className="grid">
            {results.map((m) => <MovieCard key={m.id} movie={m} />)}
          </div>
        )}
      </section>
    );
  }

  const recommended = getRecommended(movies, history);
  const topCategory = getTopCategory(history);
  const categories = [...new Set(movies.map((m) => m.categoria))];

  return (
    <>
      <HeroBanner movie={recommended[0]} />
      <MovieRow
        title={topCategory ? `Recomendados para ti · te gusta ${topCategory}` : "Recomendados para ti"}
        movies={recommended}
      />
      {categories.map((cat) => (
        <MovieRow key={cat} title={cat} movies={movies.filter((m) => m.categoria === cat)} />
      ))}
    </>
  );
}
