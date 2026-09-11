import { useState } from "react";
import "./App.css";

function App() {
  const [cat, setCat] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [favorites, setFavorites] = useState([]);

  const getRandomCat = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://api.thecatapi.com/v1/images/search"
      );

      if (!response.ok) {
        throw new Error("Ошибка запроса");
      }

      const data = await response.json();

      setCat(data[0]);
    } catch (error) {
      setError("Не удалось загрузить котика 😿");
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = () => {
    if (!cat) return;

    const alreadyExists = favorites.some(
      (favorite) => favorite.id === cat.id
    );

    if (!alreadyExists) {
      setFavorites([...favorites, cat]);
    }
  };

  const removeFromFavorites = (id) => {
    setFavorites(
      favorites.filter((favorite) => favorite.id !== id)
    );
  };

  return (
    <div className="app">
      <h1> Random Cat</h1>

      <div className="cat-container">
        {loading && <p className="loading">Загрузка котика... </p>}

        {error && <p className="error">{error}</p>}

        {!loading && !error && cat && (
          <img
            className="cat-image"
            src={cat.url}
            alt="Random cat"
          />
        )}

        {!cat && !loading && !error && (
          <p className="welcome">
            Нажми кнопку и получи случайного котика 
          </p>
        )}

        <button className="new-cat" onClick={getRandomCat}>
          Новый кот 
        </button>

        {cat && !loading && (
          <button
            className="favorite-button"
            onClick={addToFavorites}
          >
             Добавить в избранное
          </button>
        )}
      </div>

      <section className="favorites">
        <h2> Избранные котики</h2>

        {favorites.length === 0 ? (
          <p>Пока нет избранных котиков</p>
        ) : (
          <div className="favorites-grid">
            {favorites.map((favorite) => (
              <div className="favorite-card" key={favorite.id}>
                <img
                  src={favorite.url}
                  alt="Favorite cat"
                />

                <button
                  onClick={() =>
                    removeFromFavorites(favorite.id)
                  }
                >
                   Удалить
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default App;