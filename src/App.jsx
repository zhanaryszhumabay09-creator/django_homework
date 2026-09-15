import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [playerName, setPlayerName] = useState("");
  const [number, setNumber] = useState("");
  const [secretNumber, setSecretNumber] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [results, setResults] = useState([]);

  const startGame = () => {
    if (!playerName.trim()) {
      setMessage("Введите имя игрока");
      return;
    }

    const randomNumber = Math.floor(Math.random() * 100) + 1;

    setSecretNumber(randomNumber);
    setAttempts(0);
    setNumber("");
    setMessage("Я загадал число от 1 до 100!");
    setGameStarted(true);
    setGameFinished(false);
  };

  const makeAttempt = () => {
    const userNumber = Number(number);

    if (!userNumber || userNumber < 1 || userNumber > 100) {
      setMessage("Введите число от 1 до 100");
      return;
    }

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (userNumber < secretNumber) {
      setMessage("Число больше ⬆️");
    } else if (userNumber > secretNumber) {
      setMessage("Число меньше ⬇️");
    } else {
      setMessage("Угадано! ");
      setGameFinished(true);
      setGameStarted(false);

      saveResult(newAttempts, "win");
    }

    setNumber("");
  };

  const saveResult = async (attemptCount, result) => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/game-results/",
        {
          player_name: playerName,
          attempts: attemptCount,
          result: result,
        }
      );

      loadResults();
    } catch (error) {
      console.error("Ошибка сохранения:", error);
    }
  };

  const loadResults = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/game-results/"
      );

      setResults(response.data);
    } catch (error) {
      console.error("Ошибка загрузки:", error);
    }
  };

  const restartGame = () => {
    setSecretNumber(null);
    setAttempts(0);
    setNumber("");
    setMessage("");
    setGameStarted(false);
    setGameFinished(false);
  };

  return (
    <div className="app">
      <div className="game-card">
        <h1> Угадай число</h1>

        {!gameStarted && !gameFinished && (
          <>
            <label>Имя игрока:</label>

            <input
              type="text"
              value={playerName}
              onChange={(event) => setPlayerName(event.target.value)}
              placeholder="Введите имя"
            />

            <button onClick={startGame}>
              Начать игру
            </button>
          </>
        )}

        {gameStarted && (
          <>
            <h2>Угадай число от 1 до 100</h2>

            <input
              type="number"
              value={number}
              onChange={(event) => setNumber(event.target.value)}
              placeholder="Введите число"
              min="1"
              max="100"
            />

            <button onClick={makeAttempt}>
              Проверить
            </button>

            <p className="attempts">
              Попыток: {attempts}
            </p>

            <p className="message">
              {message}
            </p>
          </>
        )}

        {gameFinished && (
          <>
            <p className="success">
               {playerName}, ты угадал!
            </p>

            <p>
              Количество попыток: {attempts}
            </p>

            <button onClick={restartGame}>
              Начать заново
            </button>
          </>
        )}

        <hr />

        <h2> Результаты игр</h2>

        <button onClick={loadResults}>
          Обновить результаты
        </button>

        {results.length === 0 ? (
          <p>Результатов пока нет</p>
        ) : (
          <div className="results">
            {results.map((item) => (
              <div className="result" key={item.id}>
                <strong>{item.player_name}</strong>

                <span>
                  Попыток: {item.attempts}
                </span>

                <span>
                  {item.result === "win"
                    ? "Победа "
                    : "Поражение "}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;