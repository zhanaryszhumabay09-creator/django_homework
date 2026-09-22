import { useEffect, useState } from "react";
import styles from "./MusicPlayer.module.css";

const songs = [
  {
    title: "Blinding Lights",
    artist: "The Weeknd",
    cover: "https://picsum.photos/400/400?random=1",
    progress: 35,
  },
  {
    title: "Shape of You",
    artist: "Ed Sheeran",
    cover: "https://picsum.photos/400/400?random=2",
    progress: 50,
  },
  {
    title: "Believer",
    artist: "Imagine Dragons",
    cover: "https://picsum.photos/400/400?random=3",
    progress: 65,
  },
  {
    title: "Stay",
    artist: "The Kid LAROI",
    cover: "https://picsum.photos/400/400?random=4",
    progress: 25,
  },
  {
    title: "Havana",
    artist: "Camila Cabello",
    cover: "https://picsum.photos/400/400?random=5",
    progress: 80,
  },
];

function MusicPlayer() {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const song = songs[currentTrack];

  // При запуске компонента
  useEffect(() => {
    console.log("Player started");

    // При размонтировании
    return () => {
      console.log("Player closed");
    };
  }, []);

  // При смене текущего трека
  useEffect(() => {
    console.log("Current track:", song.title);
    console.log("Artist:", song.artist);
  }, [currentTrack, song.title, song.artist]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrack((currentTrack + 1) % songs.length);
    setIsPlaying(false);
  };

  return (
    <div className={styles.player}>
      <img
        className={styles.cover}
        src={song.cover}
        alt={song.title}
      />

      <h2 className={styles.title}>{song.title}</h2>

      <p className={styles.artist}>{song.artist}</p>

      <div className={styles.progressContainer}>
        <div
          className={styles.progress}
          style={{ width: `${song.progress}%` }}
        ></div>
      </div>

      <p className={styles.progressText}>
        {song.progress}% прослушано
      </p>

      <div className={styles.buttons}>
        <button onClick={togglePlay}>
          {isPlaying ? "⏸ Pause" : "▶ Play"}
        </button>

        <button onClick={nextTrack}>
          Следующий трек ⏭
        </button>
      </div>

      <p className={styles.trackNumber}>
        Трек {currentTrack + 1} из {songs.length}
      </p>
    </div>
  );
}

export default MusicPlayer;