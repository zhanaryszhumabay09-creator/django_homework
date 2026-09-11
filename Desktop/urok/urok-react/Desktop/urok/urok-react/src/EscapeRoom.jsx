import { useState } from "react";

function EscapeRoom() {
  const [energy, setEnergy] = useState(3);
  const [hasKey, setHasKey] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  function startGame() {
    setEnergy(3);
    setHasKey(false);
    setGameStarted(true);
    setGameOver(false);
  }

  function searchKey() {
    if (energy > 0) {
      setEnergy(energy - 1);
      setHasKey(true);
    }

    if (energy === 1) {
      setGameOver(true);
    }
  }

  function openDoor() {
    if (hasKey) {
      setGameOver(true);
    }
  }

  function rest() {
    if (energy < 3) {
      setEnergy(energy + 1);
    }
  }

  return (
    <div className="game">
      <h1> Побег из комнаты</h1>

      {!gameStarted && !gameOver && (
        <button onClick={startGame}>
          Начать игру
        </button>
      )}

      {gameStarted && !gameOver && (
        <div>
          <h2>Энергия: {energy}</h2>

          {hasKey && <p> Вы нашли ключ!</p>}

          <button onClick={searchKey}>
             Искать ключ
          </button>

          <button onClick={openDoor}>
             Открыть дверь
          </button>

          <button onClick={rest}>
             Отдохнуть
          </button>

          <p>
            {hasKey ? "У вас есть ключ " : "Ключ ещё не найден"}
          </p>
        </div>
      )}

      {gameOver && (
        <div>
          {hasKey && energy > 0 ? (
            <h2> Вы сбежали!</h2>
          ) : (
            <h2> Вы проиграли</h2>
          )}

          <button onClick={startGame}>
            Начать заново
          </button>
        </div>
      )}
    </div>
  );
}

export default EscapeRoom;