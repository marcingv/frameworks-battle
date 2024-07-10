import { ForwardedRef, forwardRef, useImperativeHandle, useRef } from 'react';

export interface ResultModalProps {
  result: 'won' | 'lost';
  targetTime: number;
}

export interface ResultModalRef {
  open: () => void;
  close: () => void;
}

export default forwardRef(function ResultModal(
  { result, targetTime }: ResultModalProps,
  ref: ForwardedRef<ResultModalRef>
) {
  const dialog = useRef<HTMLDialogElement>(null);

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
      <h2>You {result}</h2>

      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>

      <p>
        You stopped the timer with <strong>X seconds left.</strong>
      </p>

      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>
  );
});
