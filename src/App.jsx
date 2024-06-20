import Player from "./components/Player/Player.jsx";
import GameBoard from "./components/GameBoard/GameBoard.jsx";
import {useState} from "react";
import Log from "./components/Log/Log.jsx";
import {WINNING_COMBINATIONS} from "./winning-combinations.js";
import GameOver from "./components/GameOver/GameOver.jsx";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const gameBoard = initializeNewBoard(gameTurns);
  const activePlayer = deriveActivePlayer(gameTurns);
  const winner = getWinner(gameBoard);
  const isDraw = gameTurns.length === 9 && !winner;

  function getWinner(gameBoard) {
    let winner = undefined;

    for (const combination of WINNING_COMBINATIONS) {
      const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
      const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
      const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

      if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
        winner = firstSquareSymbol;
      }
    }

    return winner;
  }

    function initializeNewBoard(gameTurns) {
    const board = [...initialGameBoard.map((row) => [...row])];
    gameTurns.forEach((oneTurn) => {
      board[oneTurn.square.row][oneTurn.square.col] = oneTurn.player;
    });

    return board;
  }

  function handleRematch() {
    setGameTurns([]);
  }

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

        { (winner || isDraw) && <GameOver winner={winner} onRematch={handleRematch}></GameOver> }
        <GameBoard gameBoard={gameBoard} onSelectSquare={handleSelectSquare}/>
      </div>

      <Log gameTurns={gameTurns}/>
    </main>
  );
}

export default App
