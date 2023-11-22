import { useEffect, useState } from "react";
import useSound from "use-sound";
import qala from "../assets/qala.mp3";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { IconContext } from "react-icons";

export default function Player() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState({
    min: "",
    sec: "",
  });
  const [currTime, setCurrTime] = useState({
    min: "",
    sec: "",
  });
  const [seconds, setSeconds] = useState();
  const [play, { pause, duration, sound }] = useSound(qala);
  useEffect(() => {
    if (duration) {
      const sec = duration / 1000;
      const min = Math.floor(sec / 60);
      const secRemain = Math.floor(sec % 60);
      setTime({
        min: min,
        sec: secRemain,
      });
    }
  }, [isPlaying]);
  useEffect(() => {
    const interval = setInterval(() => {
      if (sound) {
        setSeconds(sound.seek([]));
        const min = Math.floor(sound.seek([]) / 60);
        const sec = Math.floor(sound.seek([]) % 60);
        setCurrTime({
          min,
          sec,
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [sound]);
  const playingButton = () => {
    if (isPlaying) {
      pause();
      setIsPlaying(false);
    } else {
      play();
      setIsPlaying(true);
    }
  };
  const skipBackward = () => {
    if (sound) {
      const newTime = Math.max(sound.seek([]) - 10, 0);
      sound.seek([newTime]);
    }
  };
  const skipForward = () => {
    if (sound) {
      const newTime = Math.min(sound.seek([]) + 10, duration / 1000);
      sound.seek([newTime]);
    }
  };
  useEffect(() => {
    let iteration = 0;
    const change = setInterval(() => {
      const title = document.querySelector(".title");
      title.innerText = title.innerText
        .split("")
        .map((letters, index) => {
          if (index < iteration) {
            return title.dataset.value[index];
          }
          return String.fromCharCode(65 + Math.floor(Math.random() * 26));
        })
        .join("");
      if (iteration >= title.dataset.value.length) clearInterval(change);
      iteration += 1 / 4;
    }, 30);
    return () => {
      clearInterval(change);
      const title = document.querySelector(".title");
      title.innerText = title.dataset.value;
    };
  }, []);
  return (
    <div className="component">
      <img
        className="musicCover"
        src="https://raw.githubusercontent.com/abxlfazl/music-player-widget/main/src/assets/media/songs/1/img.jpg"
        width="60%"
      />
      <div>
        <h2 className="title" data-value="Talking to the moon">
          Talking to the moon
        </h2>
      </div>
      <div>
        <div className="time">
          <p>
            {currTime.min}:{currTime.sec}
          </p>
          <p>
            {time.min}:{time.sec}
          </p>
        </div>
        <input
          type="range"
          min="0"
          max={duration / 1000}
          default="0"
          value={seconds}
          className="timeline"
          onChange={(e) => {
            sound.seek([e.target.value]);
          }}
        />
      </div>
      <div>
        <button className="playButton" onClick={skipBackward}>
          <IconContext.Provider value={{ size: "3em", color: "#222222ff" }}>
            <BiSkipPrevious />
          </IconContext.Provider>
        </button>
        {!isPlaying ? (
          <button className="playButton" onClick={playingButton}>
            <IconContext.Provider value={{ size: "3em", color: "#222222ff" }}>
              <AiFillPlayCircle />
            </IconContext.Provider>
          </button>
        ) : (
          <button className="playButton" onClick={playingButton}>
            <IconContext.Provider value={{ size: "3em", color: "#222222ff" }}>
              <AiFillPauseCircle />
            </IconContext.Provider>
          </button>
        )}
        <button className="playButton" onClick={skipForward}>
          <IconContext.Provider value={{ size: "3em", color: "#222222ff" }}>
            <BiSkipNext />
          </IconContext.Provider>
        </button>
      </div>
    </div>
  );
}
