import React from "react";
import Navbar from "./Navbar";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./MainScreen.css";
import { useEffect, useState } from "react";

const MainScreen = (props) => {
  const percentage = "10:00";
  const { workMinutes, breakMinutes, updateSettings } = props;

  const [seconds, setSeconds] = useState();
  const [minutes, setMinutes] = useState();
  const [isPaused, setIsPaused] = useState(false);
  const [isBreak, setIsBreak] = useState(false)
  const [_interval, _setInterval] = useState(0);
  const [_remainingTimeinMs, _setRemainingTimeinMs] = useState(0);



  const configureTime = (_session, _break) => {
    if (!isBreak) {
      _session < 10 ? setMinutes(`0${_session}`) : setMinutes(workMinutes);
      setSeconds("00");
    } else {
      _break < 10 ? setMinutes(`0${_break}`) : setMinutes(_break);
      setSeconds("00");
    }
  };
  const countDownFunction = (_endTime) => {
    let remainingTimeinMs = _endTime - Date.now();
    _setRemainingTimeinMs(remainingTimeinMs);
    let remainingTimeinS = Math.round(remainingTimeinMs / 1000);
    //Preparing for the two digits minutes & seconds
    let _tempMinute = Math.floor(remainingTimeinS / 60);
    let _tempSeconds = Math.floor(remainingTimeinS % 60);
    _tempMinute < 10 ? setMinutes(`0${_tempMinute}`) : setMinutes(_tempMinute);
    _tempSeconds < 10
      ? setSeconds(`0${_tempSeconds}`)
      : setSeconds(_tempSeconds);
  };

  const changePlayBtn = () => {
    if (minutes === "00" && seconds === "00") return;
    setIsPaused(!isPaused);
    if (!isPaused) {
      let totalTimeinMs = _remainingTimeinMs;
      let _endTime = totalTimeinMs + Date.now();
      _setInterval(
        setInterval(() => {
          countDownFunction(_endTime);
        }, 100)
      );
    } else {
      clearInterval(_interval);
    }
  };

  const restartFunction = () => {
    configureTime(workMinutes, breakMinutes);
    clearInterval(_interval);
    setIsPaused(false);
    setIsBreak(false);
    _setRemainingTimeinMs(workMinutes * 60000);
  };
  const changeSettings = () => {
    restartFunction();
    updateSettings(true);
  };

  useEffect(() => {
    configureTime(workMinutes, breakMinutes);
    if (!isBreak) {
      _setRemainingTimeinMs(workMinutes * 60000);
    } else {
      _setRemainingTimeinMs(breakMinutes * 60000);
    }
  }, [workMinutes, breakMinutes, isBreak]);
  //useEffect
  useEffect(() => {
    if (
      minutes === "00" &&
      seconds === "00" &&
      _remainingTimeinMs < 1000 &&
      _remainingTimeinMs !== 0
    ) {
      clearInterval(_interval);
      setIsPaused(false);
      setIsBreak(!isBreak);
    }
  }, [minutes, seconds]);


  const timeLeftPercentage = (_remainingTimeinMs / (workMinutes * 60000)) * 100;
  const originalTimePercentage = (seconds + minutes * 60) / (workMinutes * 60) * 100;
const breakTimeLeftPercentage = (_remainingTimeinMs / (breakMinutes * 60000)) * 100


  return (
    <>
      <Navbar />
      <div className="timer">
        <CircularProgressbar
          value={!isBreak ? timeLeftPercentage : breakTimeLeftPercentage}
          text={`${minutes}:${seconds}`}
          styles={buildStyles({
            pathColor: "#002A32",
            textColor: "#002A32",
            trailColor: "#F40076",
          })}
        />
      </div>
      <div className="button--section">
        <div onClick={changePlayBtn} className="play">
          {!isPaused ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="none"
              class="w-6 h-6"
              height="24"
              width="24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                fill="white"
                d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="white"
              class="w-6 h-6"
              height="24"
              width="24"
            >
              <path
              fill="white"
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 5.25v13.5m-7.5-13.5v13.5"
              />
            </svg>
          )}
        </div>
        <div onClick={changeSettings} className="settings">
          <p>Settings</p>
        </div>
        <div onClick={restartFunction} className="reset">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="white"
            class="w-6 h-6"
            height="24"
            width="24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </div>
      </div>
    </>
  );
};

export default MainScreen;
