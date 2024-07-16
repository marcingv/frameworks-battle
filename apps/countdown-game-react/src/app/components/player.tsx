import { useRef, useState } from 'react';

export default function Player() {
  const playerNameRef = useRef<HTMLInputElement>(null);
  const [playerName, setPlayerName] = useState('');

  function handleSubmit(): void {
    setPlayerName(playerNameRef.current?.value ?? '');
    if (playerNameRef.current) {
      playerNameRef.current.value = '';
    }
  }

  return (
    <section id="player">
      <h2>Welcome {playerName ? playerName : 'unknown entity'}</h2>
      <p>
        <input type="text" ref={playerNameRef} />
        <button onClick={handleSubmit}>Set Name</button>
      </p>
    </section>
  );
}
