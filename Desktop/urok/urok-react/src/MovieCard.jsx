import { useState } from "react";

function MovieCard({ title, genre, year }) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="movie-card">
      <h2>{title}</h2>
      <p>Жанр: {genre}</p>
      <p>Год: {year}</p>

      <button onClick={() => setIsFavorite(!isFavorite)}>
        {isFavorite ? "В избранном" : "В избранное"}
      </button>
    </div>
  );
}

export default MovieCard;