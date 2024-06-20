import Player from "./components/Player/Player.jsx";
import GameBoard from "./components/GameBoard/GameBoard.jsx";
import {useState} from "react";
import Log from "./components/Log/Log.jsx";

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [activePlayer, setActivePlayer] = useState('X');

  function handleSelectSquare(playerSymbol, rowIdx, colIdx) {
    setActivePlayer((prevActivePlayer) => prevActivePlayer === 'X' ? 'O' : 'X');
    setGameTurns((prevState) => {
      return [
        {player: playerSymbol, square: {row: rowIdx, col: colIdx}},
        ...prevState,
      ];
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={activePlayer === 'X'}/>
          <Player name="Player 2" symbol="O" isActive={activePlayer === 'O'}/>
        </ol>

        <GameBoard gameTurns={gameTurns} activePlayerSymbol={activePlayer} onSelectSquare={handleSelectSquare}/>
      </div>

      <Log gameTurns={gameTurns} />
    </main>
  );
}

export default App
