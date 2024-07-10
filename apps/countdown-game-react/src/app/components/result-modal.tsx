import { ForwardedRef, forwardRef, useImperativeHandle, useRef } from 'react';

export interface ResultModalProps {
  targetTimeMillis: number;
  remainingTimeMillis?: number;
}

export interface ResultModalRef {
  open: () => void;
  close: () => void;
}

export default forwardRef(function ResultModal(
  { targetTimeMillis, remainingTimeMillis }: ResultModalProps,
  ref: ForwardedRef<ResultModalRef>
) {
  const targetTimeSecs = +(targetTimeMillis / 1000).toFixed(0);
  const dialog = useRef<HTMLDialogElement>(null);
  let result: 'won' | 'lost' | undefined;
  if (remainingTimeMillis !== undefined) {
    result = remainingTimeMillis <= 0 ? 'lost' : 'won';
  }

  let remainingSeconds: number | undefined;
  if (!remainingTimeMillis || remainingTimeMillis < 0) {
    remainingSeconds = 0;
  } else {
    remainingSeconds = +(remainingTimeMillis / 1000).toFixed(2);
  }

  const score = Math.round(
    (1 - (remainingTimeMillis ?? targetTimeMillis) / targetTimeMillis) * 100
  );

  useImperativeHandle(ref, (): ResultModalRef => {
    return {
      open(): void {
        dialog.current?.showModal();
      },
      close(): void {
        dialog.current?.close();
      },
    };
  });

  return (
    <dialog ref={dialog} className="result-modal">
      {result === 'lost' && <h2>You lost</h2>}
      {result !== 'lost' && <h2>Your Score: {score}</h2>}

      <p>
        The target time was{' '}
        <strong>
          {targetTimeSecs} second{targetTimeSecs === 1 ? '' : 's'}.
        </strong>
      </p>

      <p>
        You stopped the timer with{' '}
        <strong>{remainingSeconds} seconds left.</strong>
      </p>

      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>
  );
});
