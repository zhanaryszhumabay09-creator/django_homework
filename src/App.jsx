import { useState } from "react";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([
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
  ]);

  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("Фантастика");

  const addMovie = () => {
    if (title.trim() === "") {
      return;
    }

    const newMovie = {
      id: Date.now(),
      title: title,
      genre: genre,
    };

    setMovies([...movies, newMovie]);

    setTitle("");
    setGenre("Фантастика");
  };

  const deleteMovie = (id) => {
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <h1>🎬 Менеджер фильмов</h1>

      {/* Поиск */}
      <input
        type="text"
        placeholder="Поиск фильма..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Добавление фильма */}
      <div className="add-movie">
        <input
          type="text"
          placeholder="Название фильма"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        >
          <option value="Фантастика">Фантастика</option>
          <option value="Комедия">Комедия</option>
          <option value="Боевик">Боевик</option>
          <option value="Драма">Драма</option>
          <option value="Ужасы">Ужасы</option>
        </select>

        <button onClick={addMovie}>Добавить</button>
      </div>

      {/* Список фильмов */}
      <div className="movies">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div className="movie-card" key={movie.id}>
              <div>
                <h2>{movie.title}</h2>
                <p>Жанр: {movie.genre}</p>
              </div>

              <button
                className="delete-button"
                onClick={() => deleteMovie(movie.id)}
              >
                Удалить
              </button>
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