import { Link } from "react-router-dom";

export default function HeroBanner({ movie }) {
  if (!movie) return null;

  // Usa "banner" si existe; si no, usa "poster"
  const image = movie.banner || movie.poster;

  const style = image
    ? {
        backgroundImage: `linear-gradient(90deg, #15110e 30%, rgba(21,17,14,.35)), url(${image})`,
      }
    : undefined;

  return (
    <section className="hero" style={style}>
      <p className="hero-meta">{movie.anio} · {movie.categoria}</p>
      <h1>{movie.titulo}</h1>
      <p className="hero-text">{movie.sinopsis}</p>
      <Link to={`/watch/${movie.id}`} className="btn">Reproducir</Link>
    </section>
  );
}