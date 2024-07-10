import { useRef, useState } from 'react';

export default function TimerChallenge({
  title,
  targetTime,
}: {
  title: string;
  targetTime: number;
}) {
  const [timerStarted, setTimerStarted] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);

  const timer = useRef<NodeJS.Timeout | null>(null);

  function handleStart(): void {
    setTimerStarted(true);
    setTimerExpired(false);

    timer.current = setTimeout(() => {
      setTimerStarted(false);
      setTimerExpired(true);
    }, targetTime * 1000);
  }

  function handleStop(): void {
    clearTimeout(timer.current ?? undefined);

    setTimerStarted(false);
    setTimerExpired(false);
  }

  return (
    <section className="challenge">
      <h2>{title}</h2>

      {timerExpired && <p>You lost</p>}

      <p className="challenge-time">
        {targetTime} second{targetTime > 1 ? 's' : ''}
      </p>

      <p>
        <button onClick={timerStarted ? handleStop : handleStart}>
          {timerStarted ? 'Stop' : 'Start'} Challenge
        </button>
      </p>

      <p className={timerStarted ? 'active' : undefined}>
        {timerStarted ? 'Time is running...' : 'Timer inactive'}
      </p>
    </section>
  );
}
