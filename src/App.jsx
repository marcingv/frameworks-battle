import Player from "./components/Player/Player.jsx";
import GameBoard from "./components/GameBoard/GameBoard.jsx";
import {useState} from "react";

function App() {
  const [activePlayer, setActivePlayer] = useState('X');

  function handleSelectSquare() {
    setActivePlayer((prevActivePlayer) => prevActivePlayer === 'X' ? 'O' : 'X');
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={activePlayer === 'X'} />
          <Player name="Player 2" symbol="O" isActive={activePlayer === 'O'} />
        </ol>

        <GameBoard activePlayerSymbol={activePlayer} onSelectSquare={handleSelectSquare} />
      </div>
    </main>
  );
}

export default App
