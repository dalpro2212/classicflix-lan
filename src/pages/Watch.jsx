import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReviewForm from "../components/ReviewForm.jsx";
import { addToHistory } from "../utils/history.js";

export default function Watch({ movies, loading, user }) {
  const { id } = useParams(); // parámetro dinámico de /watch/:id
  const movie = movies.find((m) => String(m.id) === id);

  const [tab, setTab] = useState("sinopsis");
  const [reviews, setReviews] = useState([]);
  const registered = useRef(false); // para guardar la visualización una sola vez

  const reviewsKey = `classicflix_reviews_${id}`;

  // Cargar reseñas de esta película y reiniciar al cambiar de película
  useEffect(() => {
    setReviews(JSON.parse(localStorage.getItem(reviewsKey)) || []);
    setTab("sinopsis");
    registered.current = false;
  }, [reviewsKey]);

  const handlePlay = () => {
    if (!movie || registered.current) return;
    addToHistory(movie);
    registered.current = true;
  };

  const addReview = (data) => {
    const review = { ...data, autor: user ? user.nombre : "Invitado", fecha: new Date().toLocaleDateString() };
    const updated = [review, ...reviews];
    setReviews(updated);
    localStorage.setItem(reviewsKey, JSON.stringify(updated));
  };

  if (loading) return <p className="empty">Cargando…</p>;
  if (!movie) {
    return (
      <p className="empty">
        Película no encontrada. <Link to="/">Volver al inicio</Link>
      </p>
    );
  }

  return (
    <div className="watch">
      <video className="player" controls src={movie.video} onPlay={handlePlay} />

      <h1>{movie.titulo}</h1>
      <p className="hero-meta">{movie.anio} · {movie.categoria}</p>

      <div className="tabs" role="tablist">
        {[
          ["sinopsis", "Sinopsis"],
          ["ficha", "Ficha técnica"],
          ["resenas", `Reseñas (${reviews.length})`],
        ].map(([key, label]) => (
          <button
            key={key}
            role="tab"
            aria-selected={tab === key}
            className={tab === key ? "tab active" : "tab"}
            onClick={() => setTab(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "sinopsis" && <p className="panel">{movie.sinopsis}</p>}

      {tab === "ficha" && (
        <dl className="panel facts">
          <dt>Año</dt><dd>{movie.anio}</dd>
          <dt>Categoría</dt><dd>{movie.categoria}</dd>
          <dt>Director</dt><dd>{movie.director || "Desconocido"}</dd>
          <dt>Duración</dt><dd>{movie.duracion || "—"}</dd>
        </dl>
      )}

      {tab === "resenas" && (
        <div className="panel">
          <ReviewForm onSubmit={addReview} />
          {reviews.length === 0 && <p className="empty">Aún no hay reseñas. Escribe la primera.</p>}
          {reviews.map((r, i) => (
            <article key={i} className="review">
              <strong>{r.autor}</strong> · {"★".repeat(r.puntuacion)}{"☆".repeat(5 - r.puntuacion)}
              <p>{r.comentario}</p>
              <small>{r.fecha}</small>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
