import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  return (
    <Link to={`/watch/${movie.id}`} className="card">
      <div className="poster">
        {movie.poster ? (
          <img src={movie.poster} alt={movie.titulo} loading="lazy" />
        ) : (
          <span className="poster-title">{movie.titulo}</span>
        )}
      </div>
      <div className="card-info">
        <strong>{movie.titulo}</strong>
        <small>{movie.anio} · {movie.categoria}</small>
      </div>
    </Link>
  );
}
