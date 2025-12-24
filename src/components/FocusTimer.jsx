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
    <section className="focus-timer brutal-box" aria-label="Focus timer">
      <div className="section-heading" style={{ borderBottom: '2px solid #000', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
        <p className="eyebrow">FOCUS_MODULE</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: 'bold' }}>TIMER_STATUS:</span>
          <span style={{ background: isRunning ? '#ff3333' : '#eee', color: isRunning ? '#fff' : '#000', padding: '0 0.5rem', fontWeight: 'bold' }}>
            {hasFinished ? "DONE" : isRunning ? "RUNNING" : "IDLE"}
          </span>
        </div>
      </div>

      <div className="timer-display" style={{ display: 'grid', placeItems: 'center', border: '4px solid #000', padding: '2rem', marginBottom: '1.5rem', background: isRunning ? '#fff' : '#f0f0f0' }}>
        <span style={{ fontSize: '3rem', fontWeight: '700', lineHeight: 1 }}>{formattedTime}</span>
        <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          {isRunning ? "Time Remaining" : "Target Duration"}
        </span>
      </div>

      <div className="timer-inputs" style={{ marginBottom: '1.5rem' }}>
        <div className="timer-input">
          <span>MINUTES</span>
          <input
            type="number"
            min="0"
            max="180"
            value={minutes}
            onChange={(e) => setMinutes(clamp(Number(e.target.value), 0, 180))}
            disabled={isRunning}
            className="task-field"
            style={{ border: '2px solid #000', backgroundColor: '#fff' }}
          />
        </div>
        <div className="timer-input">
          <span>SECONDS</span>
          <input
            type="number"
            min="0"
            max="59"
            value={seconds}
            onChange={(e) => setSeconds(clamp(Number(e.target.value), 0, 59))}
            disabled={isRunning}
            className="task-field"
            style={{ border: '2px solid #000', backgroundColor: '#fff' }}
          />
        </div>
      </div>

      <div className="timer-presets" style={{ marginBottom: '1.5rem' }}>
        {PRESETS.map((preset) => (
          <button
            key={preset.label}
            onClick={() => applyPreset(preset.minutes)}
            className="primary-btn"
            style={{ background: '#fff', color: '#000', fontSize: '0.75rem', padding: '0.5rem' }}
            disabled={isRunning}
          >
            [{preset.label}]
          </button>
        ))}
      </div>

      <div className="timer-actions">
        {isRunning ? (
          <button className="primary-btn" onClick={handlePause} style={{ width: '100%' }}>
            <PiPauseFill />
            PAUSE
          </button>
        ) : (
          <button
            className="primary-btn flex items-center gap-3"
            onClick={handleStart}
            disabled={timeLeft === 0}
            style={{ width: '100%' }}
          >
            <PiPlayFill />
            INITIALIZE
          </button>
        )}
        <button className="icon-btn" onClick={handleReset} style={{ width: '100%', marginTop: '0.5rem' }}>
          <PiArrowCounterClockwiseBold />
          RESET_SYSTEM
        </button>
      </div>

      {/* Hidden audio element for alarm */}
      <audio ref={audioRef} src={alarmSound} />
    </section>
  );
};

export default FocusTimer;

