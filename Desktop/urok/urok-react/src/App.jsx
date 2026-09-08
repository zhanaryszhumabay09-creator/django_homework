import "./App.css";
import MovieCard from "./MovieCard";

function App() {
  return (
    <div className="page">
      <h1>Фильмы</h1>

      <MovieCard
        title="Интерстеллар"
        genre="Фантастика"
        year={2014}
      />

      <MovieCard
        title="Начало"
        genre="Фантастика, триллер"
        year={2010}
      />

      <MovieCard
        title="Форсаж"
        genre="Боевик"
        year={2001}
      />
    </div>
  );
}

export default App;