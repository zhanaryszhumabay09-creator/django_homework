import { useState } from "react";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");

  const movies = [
    {
      id: 1,
      title: "Интерстеллар",
      genre: "Фантастика",
    },
    {
      id: 2,
      title: "Матрица",
      genre: "Фантастика",
    },
    {
      id: 3,
      title: "1+1",
      genre: "Комедия",
    },
  ];

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <h1> Менеджер фильмов</h1>

      <input
        type="text"
        placeholder="Поиск фильма..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="movies">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div className="movie-card" key={movie.id}>
              <h2>{movie.title}</h2>
              <p>Жанр: {movie.genre}</p>
            </div>
          ))
        ) : (
          <p className="not-found">Фильм не найден</p>
        )}
      </div>
    </div>
  );
}

export default App;