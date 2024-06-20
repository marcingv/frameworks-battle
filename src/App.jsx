import Player from "./components/Player/Player.jsx";
import GameBoard from "./components/GameBoard/GameBoard.jsx";
import {useState} from "react";
import Log from "./components/Log/Log.jsx";

function App() {
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);

  function deriveActivePlayer(gameTurns) {
    if (!gameTurns || !gameTurns.length || gameTurns[0].player === 'O') {
      return 'X';
    }

    return 'O';
  }

  function handleSelectSquare(rowIdx, colIdx) {
    setGameTurns((prevState) => {
      const activePlayer = deriveActivePlayer(prevState);

      return [
        {player: activePlayer, square: {row: rowIdx, col: colIdx}},
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

        <GameBoard gameTurns={gameTurns} onSelectSquare={handleSelectSquare}/>
      </div>

      <Log gameTurns={gameTurns} />
    </main>
  );
}

export default App
