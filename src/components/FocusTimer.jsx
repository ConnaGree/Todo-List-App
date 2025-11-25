import { useEffect, useMemo, useState, useRef } from "react";
import {
  PiPauseFill,
  PiPlayFill,
  PiArrowCounterClockwiseBold,
} from "react-icons/pi";
import alarmSound from "../assets/alarm.mp3";

const PRESETS = [
  { label: "Quick (15m)", minutes: 15 },
  { label: "Deep (25m)", minutes: 25 },
  { label: "Stretch (45m)", minutes: 45 },
];

const clamp = (value, min, max) => {
  if (Number.isNaN(value)) return min;
  return Math.min(max, Math.max(min, value));
};

const FocusTimer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [initialDuration, setInitialDuration] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  const audioRef = useRef(null);

  const formattedTime = useMemo(() => {
    const mins = String(Math.floor(timeLeft / 60)).padStart(2, "0");
    const secs = String(timeLeft % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  }, [timeLeft]);

  const progress = useMemo(() => {
    if (initialDuration === 0) return 0;
    return (timeLeft / initialDuration) * 100;
  }, [timeLeft, initialDuration]);

  // Timer countdown effect
  useEffect(() => {
    if (!isRunning) return;
    if (timeLeft === 0) {
      setIsRunning(false);
      setHasFinished(true);
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  // Play alarm when timer finishes
  useEffect(() => {
    if (hasFinished && audioRef.current) {
      audioRef.current.play().catch(err => console.error("Error playing alarm:", err));
    }
  }, [hasFinished]);

  // Auto-reset after 2 minutes when timer finishes
  useEffect(() => {
    if (!hasFinished) return;

    const resetTimeout = setTimeout(() => {
      handleReset();
    }, 2 * 60 * 1000); // 2 minutes in milliseconds

    return () => clearTimeout(resetTimeout);
  }, [hasFinished]);

  // Stop alarm when reset
  useEffect(() => {
    if (!hasFinished && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [hasFinished]);

  useEffect(() => {
    if (isRunning) return;
    const totalSeconds = clamp(minutes, 0, 180) * 60 + clamp(seconds, 0, 59);
    setTimeLeft(totalSeconds);
    setInitialDuration(totalSeconds || 0);
  }, [minutes, seconds, isRunning]);

  const handleStart = () => {
    if (timeLeft === 0) return;
    setIsRunning(true);
    setHasFinished(false);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setHasFinished(false);
    setMinutes(25);
    setSeconds(0);
    setTimeLeft(25 * 60);
    setInitialDuration(25 * 60);
  };

  const applyPreset = (presetMinutes) => {
    setIsRunning(false);
    setHasFinished(false);
    setMinutes(presetMinutes);
    setSeconds(0);
    setTimeLeft(presetMinutes * 60);
    setInitialDuration(presetMinutes * 60);
  };

  return (
    <section className="focus-timer glass-panel" aria-label="Focus timer">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Focus Timer</p>
          <h2>Set the tone for deep work</h2>
        </div>
        <span
          className={`status-chip ${hasFinished ? "success" : isRunning ? "active" : "idle"
            }`}
        >
          {hasFinished ? "Complete" : isRunning ? "Running" : "Ready"}
        </span>
      </div>

      <div
        className="timer-progress"
        style={{
          background: timeLeft <= 300 && timeLeft > 0
            ? `conic-gradient(#fb7185 ${progress * 3.6}deg, rgba(251,113,133,.15) 0deg)`
            : `conic-gradient(#38bdf8 ${progress * 3.6}deg, rgba(148,163,184,.15) 0deg)`,
        }}
      >
        <div className="timer-progress__inner">
          <span className="timer-progress__value">{formattedTime}</span>
          <span className="timer-progress__label">
            {isRunning ? "Remaining" : "Planned"}
          </span>
        </div>
      </div>

      <div className="timer-inputs">
        <label className="timer-input">
          <span>Minutes</span>
          <input
            type="number"
            min="0"
            max="180"
            value={minutes}
            onChange={(e) => setMinutes(clamp(Number(e.target.value), 0, 180))}
            disabled={isRunning}
          />
        </label>
        <label className="timer-input">
          <span>Seconds</span>
          <input
            type="number"
            min="0"
            max="59"
            value={seconds}
            onChange={(e) => setSeconds(clamp(Number(e.target.value), 0, 59))}
            disabled={isRunning}
          />
        </label>
      </div>

      <div className="timer-presets">
        {PRESETS.map((preset) => (
          <button
            key={preset.label}
            onClick={() => applyPreset(preset.minutes)}
            className="pill-btn"
            disabled={isRunning}
          >
            {preset.label}
          </button>
        ))}
      </div>

      <div className="timer-actions">
        {isRunning ? (
          <button className="primary-btn" onClick={handlePause}>
            <PiPauseFill />
            Pause
          </button>
        ) : (
          <button
            className="primary-btn"
            onClick={handleStart}
            disabled={timeLeft === 0}
          >
            <PiPlayFill />
            Start
          </button>
        )}
        <button className="secondary-btn" onClick={handleReset}>
          <PiArrowCounterClockwiseBold />
          Reset
        </button>
      </div>

      {/* Hidden audio element for alarm */}
      <audio ref={audioRef} src={alarmSound} />
    </section>
  );
};

export default FocusTimer;

