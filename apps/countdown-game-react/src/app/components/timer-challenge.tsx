import { useRef, useState } from 'react';
import ResultModal, { ResultModalRef } from './result-modal';

export default function TimerChallenge({
  title,
  targetTimeSecs,
}: {
  title: string;
  targetTimeSecs: number;
}) {
  const [timerStarted, setTimerStarted] = useState(false);

  const startTime = useRef<number | null>(null);
  const stopTime = useRef<number | null>(null);
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const dialog = useRef<ResultModalRef>(null);
  const targetTimeMillis: number = targetTimeSecs * 1000;

  let durationTimeMillis: number | undefined;
  if (startTime.current && stopTime.current) {
    durationTimeMillis = stopTime.current - startTime.current;
  }

  let remainingTimeMillis: number | undefined;
  if (durationTimeMillis !== undefined) {
    remainingTimeMillis = targetTimeMillis - durationTimeMillis;
  }

  if (remainingTimeMillis !== undefined && dialog.current) {
    dialog.current.open();
  }

  function handleStart(): void {
    setTimerStarted(true);

    startTime.current = Date.now();
    stopTime.current = null;

    timeout.current = setTimeout(() => {
      stopTimer();
    }, targetTimeMillis);
  }

  function handleStop(): void {
    stopTimer();
  }

  function stopTimer(): void {
    clearTimeout(timeout.current ?? undefined);

    setTimerStarted(false);
    stopTime.current = Date.now();
  }

  return (
    <>
      <ResultModal
        ref={dialog}
        targetTimeMillis={targetTimeMillis}
        remainingTimeMillis={remainingTimeMillis}
      />
      <section className="challenge">
        <h2>{title}</h2>

        <p className="challenge-time">
          {targetTimeSecs} second{targetTimeSecs > 1 ? 's' : ''}
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
    </>
  );
}
