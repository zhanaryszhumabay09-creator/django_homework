import MovieCard from "./components/MovieCard";
import "./App.css";

function App() {
  return (
    <div className="app">
      <h1> Мои фильмы</h1>

      <div className="movies">
        <MovieCard
          title="Аватар 3"
          genre="Фантастика"
          year={2025}
        />

        <MovieCard
          title="Интерстеллар"
          genre="Фантастика"
          year={2014}
        />

        <MovieCard
          title="Матрица"
          genre="Боевик"
          year={1999}
        />
      </div>
    </div>
  );
}

export default App;