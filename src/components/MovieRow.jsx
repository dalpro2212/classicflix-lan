import MovieCard from "./MovieCard.jsx";

export default function MovieRow({ title, movies }) {
  if (movies.length === 0) return null;
  return (
    <section className="row">
      <h2>{title}</h2>
      <div className="row-scroll">
        {movies.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>
    </section>
  );
}
