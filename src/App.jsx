import { useEffect, useState } from "react";
import "./App.css";

const songs = [
  {
    title: "Blinding Lights",
    artist: "The Weeknd",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500",
  },
  {
    title: "Starboy",
    artist: "The Weeknd",
    cover: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=500",
  },
  {
    title: "Believer",
    artist: "Imagine Dragons",
    cover: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=500",
  },
  {
    title: "Perfect",
    artist: "Ed Sheeran",
    cover: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=500",
  },
  {
    title: "Shape of You",
    artist: "Ed Sheeran",
    cover: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=500",
  },
];

function App() {
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const song = songs[currentSong];

  // При запуске и размонтировании
  useEffect(() => {
    console.log("Player started");

    return () => {
      console.log("Player closed");
    };
  }, []);

  // При смене песни
  useEffect(() => {
    setProgress(0);

    console.log("Current song:", song.title);
  }, [currentSong]);

  // Прогресс трека
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }

        return prev + 1;
      });
    }, 300);

    return () => clearInterval(timer);
  }, [isPlaying, currentSong]);

  // Следующий трек
  function nextSong() {
    setCurrentSong((prev) => (prev + 1) % songs.length);
  }

  return (
    <div className="app">
      <div className="player">
        <h1>🎵 Music Player</h1>

        <img
          className="cover"
          src={song.cover}
          alt={song.title}
        />

        <h2>{song.title}</h2>
        <p className="artist">{song.artist}</p>

        <div className="progress-container">
          <div
            className="progress"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="progress-text">
          {progress}%
        </div>

        <div className="buttons">
          <button onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? "⏸ Pause" : "▶ Play"}
          </button>

          <button onClick={nextSong}>
            ⏭ Следующий трек
          </button>
        </div>

        <p className="track-number">
          Трек {currentSong + 1} из {songs.length}
        </p>
      </div>
    </div>
  );
}

export default App;