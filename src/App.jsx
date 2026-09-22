import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API = "http://127.0.0.1:8000/api/game-results/";

function App() {
  const [playerName, setPlayerName] = useState("");
  const [secretNumber, setSecretNumber] = useState(null);
  const [guess, setGuess] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [results, setResults] = useState([]);

  // Получаем результаты с Django
  useEffect(() => {
    getResults();
  }, []);

  async function getResults() {
    try {
      const response = await axios.get(API);
      setResults(response.data);
    } catch (error) {
      console.error("Ошибка загрузки результатов:", error);
    }
  }

  // Начало игры
  function startGame() {
    if (!playerName.trim()) {
      alert("Введите имя игрока");
      return;
    }

    const randomNumber = Math.floor(Math.random() * 100) + 1;

    setSecretNumber(randomNumber);
    setAttempts(0);
    setGuess("");
    setMessage("Я загадал число от 1 до 100!");
    setGameStarted(true);
    setGameFinished(false);
  }

  // Проверка числа
  async function checkGuess() {
    const userNumber = Number(guess);

    if (!userNumber || userNumber < 1 || userNumber > 100) {
      alert("Введите число от 1 до 100");
      return;
    }

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (userNumber === secretNumber) {
      setMessage("Угадано ");
      setGameFinished(true);
      setGameStarted(false);

      await saveResult("win", newAttempts);
      return;
    }

    if (userNumber < secretNumber) {
      setMessage("Число больше ");
    } else {
      setMessage("Число меньше ");
    }

    setGuess("");
  }

  // Сохранение результата
  async function saveResult(result, totalAttempts) {
    try {
      await axios.post(API, {
        player_name: playerName,
        attempts: totalAttempts,
        result: result,
      });

      getResults();
    } catch (error) {
      console.error("Ошибка сохранения:", error);
    }
  }

  // Проигрыш после большого количества попыток
  async function loseGame() {
    setMessage("Вы проиграли ");
    setGameFinished(true);
    setGameStarted(false);

    await saveResult("lose", attempts);
  }

  // Новая игра
  function restartGame() {
    setSecretNumber(null);
    setGuess("");
    setAttempts(0);
    setMessage("");
    setGameStarted(false);
    setGameFinished(false);
  }

  return (
    <div className="app">
      <h1> Угадай число</h1>

      {!gameStarted && !gameFinished && (
        <div className="start-box">
          <input
            type="text"
            placeholder="Введите ваше имя"
            value={playerName}
            onChange={(event) => setPlayerName(event.target.value)}
          />

          <button onClick={startGame}>
            Начать игру
          </button>
        </div>
      )}

      {gameStarted && (
        <div className="game-box">
          <h2>Попробуйте угадать число!</h2>

          <input
            type="number"
            min="1"
            max="100"
            placeholder="Ваше число"
            value={guess}
            onChange={(event) => setGuess(event.target.value)}
          />

          <button onClick={checkGuess}>
            Проверить
          </button>

          <p>{message}</p>

          <p>
            Количество попыток: <b>{attempts}</b>
          </p>

          {attempts >= 10 && (
            <button onClick={loseGame}>
              Сдаться
            </button>
          )}
        </div>
      )}

      {gameFinished && (
        <div className="finished">
          <h2>{message}</h2>

          <p>
            Попыток: <b>{attempts}</b>
          </p>

          <button onClick={restartGame}>
            Начать заново
          </button>
        </div>
      )}

      <hr />

      <h2> Результаты игр</h2>

      <div className="results">
        {results.map((item) => (
          <div className="result-card" key={item.id}>
            <b>{item.player_name}</b>

            <p>
              Попытки: {item.attempts}
            </p>

            <p>
              Результат:{" "}
              {item.result === "win" ? "Победа " : "Поражение "}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;