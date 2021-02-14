import { useState, useRef, useEffect } from "react";

const Player = (props) => {
  const audioElement = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      audioElement.current.play();
    } else {
      audioElement.current.pause();
    }
  });

  const SkipSong = (forwards = true) => {
    if (forwards) {
      props.setCurrentSongIndex(() => {
        let temp = props.currentSongIndex;
        temp++;

        if (temp > props.songs.length - 1) {
          temp = 0;
        }

        return temp;
      });
    } else {
      props.setCurrentSongIndex(() => {
        let temp = props.currentSongIndex;
        temp--;

        if (temp > props.songs.length - 1) {
          temp = 0;
        }

        return temp;
      });
    }
  };

  return (
    <div className="player">
      <audio ref={audioElement}></audio>
      <h4>Now Playing</h4>
    </div>
  );
};

export default Player;
