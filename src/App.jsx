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

  // Фильтр по жанру
  const [filterGenre, setFilterGenre] = useState("Все");

  // Редактирование
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editGenre, setEditGenre] = useState("");

  // Добавление фильма
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

  // Удаление фильма
  const deleteMovie = (id) => {
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  // Начать редактирование
  const startEdit = (movie) => {
    setEditingId(movie.id);
    setEditTitle(movie.title);
    setEditGenre(movie.genre);
  };

  // Сохранить изменения
  const saveEdit = (id) => {
    setMovies(
      movies.map((movie) =>
        movie.id === id
          ? {
              ...movie,
              title: editTitle,
              genre: editGenre,
            }
          : movie
      )
    );

    setEditingId(null);
  };

  // Поиск + фильтр по жанру
  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesGenre =
      filterGenre === "Все" || movie.genre === filterGenre;

    return matchesSearch && matchesGenre;
  });

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

      {/* Добавление */}
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
        </select>

        <button onClick={addMovie}>Добавить</button>
      </div>

      {/* Фильтр */}
      <div className="filter">
        <label>Фильтр по жанру: </label>

        <select
          value={filterGenre}
          onChange={(e) => setFilterGenre(e.target.value)}
        >
          <option value="Все">Все</option>
          <option value="Фантастика">Фантастика</option>
          <option value="Комедия">Комедия</option>
          <option value="Боевик">Боевик</option>
          <option value="Драма">Драма</option>
        </select>
      </div>

      {/* Количество найденных */}
      <h3>Найдено фильмов: {filteredMovies.length}</h3>

      {/* Список фильмов */}
      <div className="movies">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div className="movie-card" key={movie.id}>
              {editingId === movie.id ? (
                <>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />

                  <select
                    value={editGenre}
                    onChange={(e) => setEditGenre(e.target.value)}
                  >
                    <option value="Фантастика">Фантастика</option>
                    <option value="Комедия">Комедия</option>
                    <option value="Боевик">Боевик</option>
                    <option value="Драма">Драма</option>
                  </select>

                  <button onClick={() => saveEdit(movie.id)}>
                    Сохранить
                  </button>
                </>
              ) : (
                <>
                  <div>
                    <h2>{movie.title}</h2>
                    <p>Жанр: {movie.genre}</p>
                  </div>

                  <div className="buttons">
                    <button onClick={() => startEdit(movie)}>
                      Изменить
                    </button>

                    <button
                      className="delete-button"
                      onClick={() => deleteMovie(movie.id)}
                    >
                      Удалить
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <p className="empty">Список фильмов пуст</p>
        )}
      </div>
    </div>
  );
}

export default App;