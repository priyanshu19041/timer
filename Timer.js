import React, { useState, useEffect } from "react";

function Timer() {
  const [workTime, setWorkTime] = useState(25); 
  const [breakTime, setBreakTime] = useState(5); 
  const [timeLeft, setTimeLeft] = useState(workTime * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkMode, setIsWorkMode] = useState(true);

  useEffect(() => {
    setTimeLeft((isWorkMode ? workTime : breakTime) * 60);
  }, [workTime, breakTime, isWorkMode]);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 0) {
            clearInterval(timer);
            setIsWorkMode(!isWorkMode);
            return isWorkMode ? breakTime * 60 : workTime * 60;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, isWorkMode, workTime, breakTime]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div >
      <h1>{formatTime(timeLeft)}</h1>
      <h2>{isWorkMode ? "Work - Time" : "Break - Time"}</h2>
      <div>
        <button onClick={() => setIsRunning(true)} disabled={isRunning}>Start</button>
        <button onClick={() => setIsRunning(false)} disabled={!isRunning}>Stop</button>
        <button
          onClick={() => {
            setIsRunning(false);
            setTimeLeft(workTime * 60);
            setIsWorkMode(true);
          }}
        >
          Reset
        </button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <input
          type="number"
          placeholder="Enter Work Duration"
          onChange={(e) => setWorkTime(Number(e.target.value))}
          disabled={isRunning}
        />
        <input
          type="number"
          placeholder="Enter Break Duration"
          onChange={(e) => setBreakTime(Number(e.target.value))}
          disabled={isRunning}
        />
        <button
          onClick={() => {
            setTimeLeft(workTime * 60);
            setIsWorkMode(true);
          }}
          disabled={isRunning}
        >
          Set
        </button>
      </div>
    </div>
  );
}

export default Timer;
