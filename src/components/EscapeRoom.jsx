import { useState } from "react";

function EscapeRoom() {
  const [energy, setEnergy] = useState(3);
  const [hasKey, setHasKey] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  // Начать игру
  const startGame = () => {
    setEnergy(3);
    setHasKey(false);
    setGameStarted(true);
    setGameOver(false);
  };

  // Начать заново
  const restartGame = () => {
    setEnergy(3);
    setHasKey(false);
    setGameStarted(true);
    setGameOver(false);
  };

  // Искать ключ
  const searchKey = () => {
    if (!gameStarted || gameOver || hasKey) {
      return;
    }

    const newEnergy = energy - 1;
    setEnergy(newEnergy);
    setHasKey(true);

    if (newEnergy === 0) {
      setGameOver(true);
    }
  };

  // Открыть дверь
  const openDoor = () => {
    if (!hasKey || gameOver) {
      return;
    }

    setGameOver(true);
  };

  // Отдохнуть
  const rest = () => {
    if (!gameStarted || gameOver) {
      return;
    }

    if (energy < 3) {
      setEnergy(energy + 1);
    }
  };

  // Игра ещё не началась
  if (!gameStarted) {
    return (
      <div className="game">
        <h2> Побег из комнаты</h2>

        <p>Вы заперты в комнате.</p>
        <p>Найдите ключ и откройте дверь!</p>

        <button onClick={startGame}>
          Начать игру
        </button>
      </div>
    );
  }

  return (
    <div className="game">
      <h2> Побег из комнаты</h2>

      <p> Энергия: {energy}</p>

      {/* ? : */}
      <p>
        {hasKey
          ? " У вас есть ключ"
          : " Ключ ещё не найден"}
      </p>

      {/* Если игра продолжается */}
      {!gameOver && (
        <div className="actions">
          <button onClick={searchKey} disabled={hasKey}>
             Искать ключ
          </button>

          <button onClick={openDoor} disabled={!hasKey}>
             Открыть дверь
          </button>

          <button onClick={rest} disabled={energy >= 3}>
             Отдохнуть
          </button>
        </div>
      )}

      {/* && */}
      {hasKey && !gameOver && (
        <p className="success">
           Вы нашли ключ!
        </p>
      )}

      {/* Победа */}
      {gameOver && hasKey && (
        <div>
          <h2> Вы сбежали!</h2>

          <button onClick={restartGame}>
            Начать заново
          </button>
        </div>
      )}

      {/* Проигрыш */}
      {gameOver && energy === 0 && !hasKey && (
        <div>
          <h2> Вы проиграли</h2>

          <button onClick={restartGame}>
            Начать заново
          </button>
        </div>
      )}
    </div>
  );
}

export default EscapeRoom;